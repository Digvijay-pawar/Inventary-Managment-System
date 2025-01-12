const { verifyToken } = require('../services/user.service');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
        }

        const decoded = await verifyToken(token);

        req.id = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
