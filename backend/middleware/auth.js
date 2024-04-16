const jwt = require('jsonwebtoken');
const config = require('config');

// Enhanced middleware with optional admin check
function jwtAuth(requireAdmin = false) {
    return function(req, res, next) {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded.user;
            // If admin check is required but the user is not an admin, deny access
            if (requireAdmin && req.user.type !== 'admin') {
                return res.status(403).json({ msg: 'Access denied: Admins only' });
            }

            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    }
}

module.exports = jwtAuth;
