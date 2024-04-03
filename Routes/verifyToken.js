const jwt = require('jsonwebtoken');
const secretKey = 'mary123';

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ err });
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
