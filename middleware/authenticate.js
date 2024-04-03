// middleware/authenticate.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticate;
