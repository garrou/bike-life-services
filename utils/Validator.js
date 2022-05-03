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

    /**
     * @param toCheck
     * @param {Number} min
     * @param {Number} max
     * @return {Boolean}
     */
    static isValidLength = (toCheck, min, max) => {
        return validator.isLength(toCheck, {min: min, max: max});
    }

    static isBikeType = (toCheck) => {
        return ['VTT', 'Ville', 'Route'].includes(toCheck);
    }

    static isUUID = (toCheck) => {
        return validator.isUUID(toCheck);
    }
}

module.exports = Validator;