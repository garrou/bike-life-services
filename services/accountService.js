const constants = require('../constants/constants.json');

module.exports.getMyBikes = (req, res) => {
    res.status(constants.OK).json({"home": "hello"});
}