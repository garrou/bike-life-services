const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const constants = require('../constants/constants.json');

module.exports.addBike = async (req, res) => {
    const { memberId, name, image, dateOfPurchase, nbKm } = req.body;
    const km = parseInt(nbKm);
    await BikeRepository.createBike(memberId, name, image, dateOfPurchase, km);
    await BikeRepository.addAverageLifeDuration(memberId);
    const bike = new Bike(name, image, dateOfPurchase, km);
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

module.exports.updateBike = async (req, res) => {
    let bike = JSON.parse(req.body.bike);
    await BikeRepository.updateBike(bike);
    return res.status(constants.OK).json({'confirm': 'Vélo modifié', 'bike': bike});
}

module.exports.getBikeComponents = async (req, res) => {
    const { bikeId } = req.params;
    const resp = await BikeRepository.getBikeComponents(bikeId);
    return res.status(constants.OK).json(resp.rows[0]);
}