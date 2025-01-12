const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const {
    registerUser, 
    loginUser,
    getProfile
} = require('../controllers/user.controller');

router
    .post('/register', registerUser)
    .post('/login', loginUser)
    .get('/profile', authMiddleware, getProfile)

module.exports = router;