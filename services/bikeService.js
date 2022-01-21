const Bike = require('../models/Bike');
const bikeRepository = require('../repositories/bikeRepository');
const componentRepository = require('../repositories/componentRepository');
const http = require('../constants/http.json');
const validator = require('../utils/validator');

module.exports.addBike = async (req, res) => {
    const { memberId, name, image, dateOfPurchase, nbKm } = req.body;

    if (!validator.isDate(dateOfPurchase) || !validator.isValidKm(Number.parseFloat(nbKm))) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});    
    }
    const resp = await bikeRepository.createBike(memberId, name, image, dateOfPurchase, parseFloat(nbKm));
    
    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout du vélo"});
    }
    const bike = new Bike(name, image, dateOfPurchase, nbKm);
    return res.status(http.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
}

module.exports.getMemberBikes = async (req, res) => {
    const { memberId } = req.query;
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
    const resp = await bikeRepository.updateBikeKm(bikeId, km);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la modification du vélo'});
    }
    await componentRepository.updateNbKmBikeComponents(km, bikeId);
    return res.status(http.OK).json({'confirm': 'Vélo modifié'});
}