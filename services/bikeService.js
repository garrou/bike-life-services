const Bike = require('../models/Bike');
const bikeRepository = require('../repositories/bikeRepository');
const http = require('../constants/http.json');
const validator = require('../utils/validator');

module.exports.addBike = async (req, res) => {
    const { memberId, name, image, dateOfPurchase, nbKm } = req.body;

    if (!validator.isDate(dateOfPurchase) || !validator.isValidKm(Number.parseFloat(nbKm))) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});    
    }
    await bikeRepository.createBike(memberId, name, image, dateOfPurchase, parseFloat(nbKm));
    const bike = new Bike(name, image, dateOfPurchase, nbKm);
    return res.status(http.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
}

module.exports.getBikes = async (req, res) => {
    const { memberId } = req.query;
    const resp = await bikeRepository.getBikes(memberId);
    return res.status(http.OK).json({'bikes': resp.rows})
}

module.exports.deleteBike = async (req, res) => {
    const { bikeId } = req.params;
    await bikeRepository.deleteBike(bikeId);
    return res.status(http.OK).json({'confirm': 'Vélo supprimé'});
}

module.exports.updateBike = async (req, res) => {
    const bike = JSON.parse(req.body.bike);
    
    if (!validator.isDate(bike.dateOfPurchase) || !validator.isValidKm(bike.nbKm)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    await bikeRepository.updateBike(bike);
    return res.status(http.OK).json({'confirm': 'Vélo modifié', 'bike': bike});
}

module.exports.updateBikeKm = async (req, res) => {
    const { bikeId } = req.params;
    const { km } = req.body;
    
    if (!validator.isValidKm(km)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Kilomètres invalides'});
    }
    await bikeRepository.updateBikeKm(bikeId, km);
    return res.status(http.OK).json({'confirm': 'Vélo modifié'});
}