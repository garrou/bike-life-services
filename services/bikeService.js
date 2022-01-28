const Bike = require('../models/Bike');
const bikeRepository = require('../repositories/bikeRepository');
const componentRepository = require('../repositories/componentRepository');
const http = require('../constants/http.json');
const { v1: uuidv1 } = require('uuid');
const validator = require('../utils/validator');
const { createFromList } = require('../models/Bike');

module.exports.addBike = async (req, res) => {
    const { memberId, name, image, dateOfPurchase, nbKm, electric } = req.body;

    if (!validator.isDate(dateOfPurchase) || !validator.isValidKm(Number.parseFloat(nbKm))) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});    
    }
    const bikeId = uuidv1();
    const resp = await bikeRepository.createBike(bikeId, memberId, name, image, dateOfPurchase, parseFloat(nbKm), electric);
    
    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout du vélo"});
    }
    const bike = new Bike(bikeId, name, image, dateOfPurchase, parseFloat(nbKm), electric);
    return res.status(http.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
}

module.exports.getBike = async (req, res) => {
    const { bikeId } = req.params;
    const resp = await bikeRepository.getBike(bikeId);
    const bike = createFromList(resp.rows)[0];
    return res.status(http.OK).json(bike);
}

module.exports.getMemberBikes = async (req, res) => {
    const { memberId } = req.params;
    const resp = await bikeRepository.getBikes(memberId);
    const bikes = Bike.createFromList(resp.rows);
    return res.status(http.OK).json(bikes);
}

module.exports.deleteBike = async (req, res) => {
    const { bikeId } = req.params;
    const resp = await bikeRepository.deleteBike(bikeId);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la suppression du vélo'});
    }
    return res.status(http.OK).json({'confirm': 'Vélo supprimé'});
}

module.exports.update = async (req, res) => {
    const bike = JSON.parse(req.body.bike);
    
    if (!validator.isDate(bike.dateOfPurchase) || !validator.isValidKm(bike.nbKm)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const resp = await bikeRepository.updateBike(bike);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la modification du vélo'});
    }
    return res.status(http.OK).json({'confirm': 'Vélo modifié', 'bike': bike});
}

module.exports.addKm = async (req, res) => {
    const { bikeId } = req.params;
    const { km } = req.body;
    
    if (!validator.isValidKm(km)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Kilomètres invalides'});
    }
    const resp = await bikeRepository.addKm(bikeId, km);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la modification du vélo'});
    }
    await componentRepository.addKm(km, bikeId);
    return res.status(http.OK).json({'confirm': 'Kilomètre(s) ajouté(s)'});
}