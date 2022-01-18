const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const constants = require('../constants/constants.json');
const validator = require('../utils/validator');

module.exports.addBike = async (req, res) => {
    const { memberId, name, image, dateOfPurchase, nbKm } = req.body;

    if (!validator.isDate(dateOfPurchase) || !validator.isValidKm(Number.parseFloat(nbKm))) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});    
    }
    await BikeRepository.createBike(memberId, name, image, dateOfPurchase, Number.parseFloat(nbKm));
    await BikeRepository.addAverageLifeDuration(memberId);
    const bike = new Bike(name, image, dateOfPurchase, nbKm);
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
    const bike = JSON.parse(req.body.bike);
    
    if (!validator.isDate(bike.dateOfPurchase)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    await BikeRepository.updateBike(bike);
    return res.status(constants.OK).json({'confirm': 'Vélo modifié', 'bike': bike});
}

module.exports.updateBikeKm = async (req, res) => {
    const { bikeId } = req.params;
    const { km } = req.body;
    
    if (!validator.isValidKm(km)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Kilomètres invalides'});
    }
    await BikeRepository.updateBikeKm(bikeId, km);
    return res.status(constants.OK).json({'confirm': 'Vélo modifié'});
}

module.exports.getBikeComponents = async (req, res) => {
    const { bikeId } = req.params;
    const resp = await BikeRepository.getBikeComponents(bikeId);
    return res.status(constants.OK).json(resp.rows[0]);
}

module.exports.updateComponent = async (req, res) => {
    const component = JSON.parse(req.body.component);

    if (!validator.isValidKm(component.km) && !validator.isValidKm(component.duration)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    await BikeRepository.updateComponent(component);
    return res.status(constants.OK).json({'confirm': 'Composant modifié'});
}