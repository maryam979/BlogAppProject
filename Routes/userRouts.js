const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usersController');

const verifyToken = require("./verifyToken");

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);
router.get('/all',userController.getAllUsers);

// Profile route
router.get('/profile', verifyToken, userController.profile);

module.exports = router;
