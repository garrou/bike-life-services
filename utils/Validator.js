const validator = require('validator');

class Validator {

    static isDate = (toCheck) => {
        return validator.isDate(new Date(toCheck));
    }
    
    static isPassword = (toCheck) => {
        return validator.isLength(toCheck, {min: 8, max: 255});
    }
    
    static isEmail = (toCheck) => {
        return validator.isEmail(toCheck);
    }
    
    static isNumber = (toCheck) => {
        return toCheck >= 0 && toCheck < Number.MAX_VALUE;
    }
    
    static isValidName = (toCheck) => {
        return validator.isLength(toCheck, {min: 1, max: 50});
    }

    static isBikeType = (toCheck) => {
        return ['VTT', 'Ville', 'Route'].includes(toCheck);
    }

    static isUUID = (toCheck) => {
        return validator.isUUID(toCheck);
    }
}

module.exports = Validator;