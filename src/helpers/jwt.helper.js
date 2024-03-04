const jwt = require('jsonwebtoken');


const generateToken = ({ payload = {}, secretKey }) => {
    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
}