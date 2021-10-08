const constants = require('../constants/constants.json');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports.authToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(constants.UNAUTHORIZED);
    }

    jwt.verify(token, config.secretToken, (err, user) => {
        if (err) {
            return res.sendStatus(constants.FORBIDDEN);
        } 
        req.user = user;
        next();
    });
}