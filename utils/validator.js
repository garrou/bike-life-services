const validator = require('validator');

module.exports.isDate = (toCheck) => {
    return validator.isDate(new Date(toCheck));
}

module.exports.isGoodLenPass = (toCheck) => {
    return validator.isLength(toCheck, {min: 8, max: 255});
}

module.exports.isEmail = (toCheck) => {
    return validator.isEmail(toCheck);
}

module.exports.isValidKm = (toCheck) => {
    return toCheck >= 0 && toCheck < Number.MAX_VALUE;
}