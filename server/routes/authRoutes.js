const express = require('express');
const router = express.Router();
const {
    registerUser,
    authUser,
    getUserProfile,
    refreshToken,
    logoutUser
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/refresh', refreshToken);
router.post('/logout', logoutUser);

module.exports = router;
