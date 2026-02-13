const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // Generate Access Token (Short-lived: 15m)
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });

    // Generate Refresh Token (Long-lived: 7d)
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

module.exports = generateToken;
