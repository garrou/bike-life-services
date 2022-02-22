const http = require('../constants/http.json');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Guard {

    static checkToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token === null) {
            return res.sendStatus(http.UNAUTHORIZED);
        }
    
        jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
            if (err) {
                return res.sendStatus(http.UNAUTHORIZED);
            } 
            next();
        });
    }
}

module.exports = Guard;