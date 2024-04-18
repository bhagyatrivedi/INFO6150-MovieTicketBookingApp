const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Enhanced middleware to check user type against allowed types.
 * @param {string[]} allowedTypes Array of allowed user types to access the route.
 * @returns Middleware function.
 */
function jwtAuth(allowedTypes = []) {
    return function(req, res, next) {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;

            // Check if the user's type is in the allowedTypes array
            if (!allowedTypes.includes(req.user.type)) {
                return res.status(403).json({ msg: `Access denied: Allowed for ${allowedTypes.join(', ')} only` });
            }

            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    }
}

module.exports = jwtAuth;
