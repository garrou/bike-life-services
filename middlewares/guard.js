const constants = require('../constants/constants.json');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(constants.UNAUTHORIZED);
    }

    jwt.verify(token, config.jwt.secretToken, (err, user) => {
        if (err) {
            return res.sendStatus(constants.FORBIDDEN);
        } 
        req.user = user;
        next();
    });
}