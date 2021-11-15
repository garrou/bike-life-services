const constants = require('../constants/constants.json');
const validator = require('validator');

module.exports.isDate = (toCheck) => {
    return validator.isDate(new Date(toCheck));
}

module.exports.isGoodLenPass = (toCheck) => {
    return validator.isLength(toCheck, {min: constants.MIN_PASSWORD_LENGTH, max: 255});
}

module.exports.isEmail = (toCheck) => {
    return validator.isEmail(toCheck);
}

module.exports.isValidKm = (toCheck) => {
    return toCheck > 0 && toCheck < Number.MAX_SAFE_INTEGER;
}