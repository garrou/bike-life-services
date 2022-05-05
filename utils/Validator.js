const valid = require('validator');

class Validator {

    static isDate = (toCheck) => valid.isDate(new Date(toCheck));
    
    static isPassword = (toCheck) => valid.isLength(toCheck, {min: 8, max: 255});
    
    static isEmail = (toCheck) => valid.isEmail(toCheck) && valid.isLength(toCheck, {max: 255});
    
    static isNumber = (toCheck) => toCheck >= 0 && toCheck < Number.MAX_VALUE;

    /**
     * @param toCheck
     * @param {Number} min
     * @param {Number} max
     * @return {Boolean}
     */
    static isValidLength = (toCheck, min, max) => valid.isLength(toCheck, {min: min, max: max});

    static isBikeType = (toCheck) => ['VTT', 'Ville', 'Route'].includes(toCheck);

    static isUUID = (toCheck) => valid.isUUID(toCheck);
}

module.exports = Validator;