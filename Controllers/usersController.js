// usersController.js
const User = require('..//Model/userModel');
const jwt = require('jsonwebtoken');
const secretKey = 'mary123';

function generateToken(user) {
    return jwt.sign({ username: user.username }, secretKey);
}

async function register(req, res) {
    try {
        const { username, email, password } = req.body; // Include email field
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ message: 'Username already exists' });
        }
        const newUser = new User({ username, email, password }); // Include email field
        await newUser.save();
        const token = generateToken(newUser);
        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: 'Failed to register user' });
    }
}



async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) return res.send('Invalid username or password');
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' });
    }
}

function profile(req, res) {
    const user = req.user;
    res.json({ message: `Welcome ${user.username}` });
}


async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users' });
    }
}

module.exports = { register, login, profile, getAllUsers };
