const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'patient', // Default to patient if not specified
        });

        if (user) {
            const { accessToken, refreshToken } = generateToken(user._id);

            // Send Refresh Token in HttpOnly Cookie
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: accessToken, // Client stores this in memory
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const { accessToken, refreshToken } = generateToken(user._id);

            // Send Refresh Token in HttpOnly Cookie
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: accessToken,
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Refresh access token
// @route   GET /api/auth/refresh
// @access  Public (Cookie based)
const refreshToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            res.status(401);
            throw new Error('Unauthorized - No Refresh Token');
        }

        const refreshToken = cookies.jwt;

        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            res.status(401);
            throw new Error('Unauthorized - User not found');
        }

        const { accessToken } = generateToken(user._id);

        res.json({ token: accessToken });
    } catch (error) {
        res.status(403); // Forbidden
        throw new Error('Forbidden - Token Expired or Invalid');
    }
};

// @desc    Logout user / Clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    });
    res.json({ message: 'Cookie cleared' });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, authUser, refreshToken, logoutUser, getUserProfile };
