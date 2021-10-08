const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const constants = require('../constants/constants.json');

module.exports.getMyBikes = (req, res) => {
    res.status(constants.OK).json({'home': 'hello'});
}

module.exports.addBike = async (req, res) => {
    const { memberId, name, description, image } = req.body;
    await BikeRepository.createBike(memberId, name, description, image);
    const bike = new Bike(name, description, image);

    console.log('in');

    return res.status(constants.CREATED).json({bike: bike});
}