const constants = require('../constants/constants.json');
const valid = require('validator');

class Validator {

    static isDate = (toCheck) => valid.isDate(new Date(toCheck));
    
    static isPassword = (toCheck) => valid.isLength(toCheck, {min: constants.PASSWORD_MIN_SIZE, max: constants.PASSWORD_MAX_SIZE});
    
    static isEmail = (toCheck) => valid.isEmail(toCheck) && valid.isLength(toCheck, {max: constants.EMAIL_MAX_SIZE});
    
    static isNumber = (toCheck) => toCheck >= 0 && toCheck < Number.MAX_VALUE;

    static isValidLength = (toCheck, min, max) => valid.isLength(toCheck, {min: min, max: max});

    static isBikeType = (toCheck) => ['VTT', 'Ville', 'Route'].includes(toCheck);

    static isUUID = (toCheck) => valid.isUUID(toCheck);
}

module.exports = Validator;