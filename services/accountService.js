const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const constants = require('../constants/constants.json');

module.exports.addBike = async (req, res) => {
    const { memberId, name, description, image } = req.body;
    await BikeRepository.createBike(memberId, name, description, image);
    const bike = new Bike(name, description, image);
    return res.status(constants.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
}

module.exports.getBikes = async (req, res) => {
    const { memberId } = req.query;
    const resp = await BikeRepository.getBikes(memberId);
    return res.status(constants.OK).json({'bikes': resp.rows})
}

module.exports.deleteBike = async (req, res) => {
    const { bikeId } = req.params;
    await BikeRepository.deleteBike(bikeId);
    return res.status(constants.OK).json({'confirm': 'Vélo supprimé'});
}