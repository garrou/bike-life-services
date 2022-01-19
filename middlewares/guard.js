const constants = require('../constants/constants.json');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(constants.UNAUTHORIZED);
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
        if (err) {
            return res.sendStatus(constants.UNAUTHORIZED);
        } 
        next();
    });
}