const jwt = require('jwt-simple');

const tokenSecret = process.env.TOKEN_SECRET;

const auth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization !== 'undefined' && req.headers.authorization.length > 0) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            req.usuario = jwt.decode(token, tokenSecret);
            next();
        } catch (e) {
            res.status(401).json({
                status: 'error', message: 'Unauthorized',
            });
        }
    } else {
        res.status(401).json({
            status: 'error', data: null, message: 'Unauthorized', error: 'No token provided',
        });
    }
};

module.exports = {
    auth
}