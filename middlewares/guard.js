const Utils = require('../utils/Utils');
const http = require('../constants/http.json');

class Guard {

    static checkToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token === null) {
            return res.sendStatus(http.UNAUTHORIZED);
        }

        try {
            Utils.verifyJwt(token);
        } catch (err) {
            return res.sendStatus(http.UNAUTHORIZED);
        } 
        next();
    }
}

module.exports = Guard;