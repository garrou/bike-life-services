const Bike = require('../models/Bike');
const bikeRepository = require('../repositories/bikeRepository');
const componentRepository = require('../repositories/componentRepository');
const componentTypeRepository = require('../repositories/componentTypesRepository');
const http = require('../constants/http.json');
const { v1: uuidv1 } = require('uuid');
const { createFromList, fromJson } = require('../models/Bike');

module.exports.create = async (req, res) => {
    
    const { memberId } = req.params;
    const { name, kmPerWeek, nbUsedPerWeek, electric, type, addedAt } = req.body;
    const bike = new Bike(uuidv1(), name, kmPerWeek, nbUsedPerWeek, electric, type, addedAt, 0);

    if (!bike.isValid()) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});    
    }
    const resp = await bikeRepository.create(memberId, bike);
    
    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout du vélo"});
    }
    const types = electric 
                ? (await componentTypeRepository.get()).rows
                : (await componentTypeRepository.getWithoutBattery()).rows;

    types.forEach(async (type) => {
        await componentRepository.create(uuidv1(), bike.id, type.average_duration, type.name);
    });
    return res.status(http.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
}

module.exports.get = async (req, res) => {

    const { bikeId } = req.params;
    const resp = await bikeRepository.get(bikeId);
    const bike = createFromList(resp.rows)[0];
    return res.status(http.OK).json(bike);
}

module.exports.getByMember = async (req, res) => {

    const { memberId } = req.params;
    const resp = await bikeRepository.getByMember(memberId);
    const bikes = createFromList(resp.rows);
    return res.status(http.OK).json(bikes);
}

module.exports.delete = async (req, res) => {

    const { bikeId } = req.params;
    const resp = await bikeRepository.delete(bikeId);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la suppression du vélo'});
    }
    return res.status(http.OK).json({'confirm': 'Vélo supprimé'});
}

module.exports.update = async (req, res) => {
    
    const bike = fromJson(JSON.parse(req.body.bike));
    
    if (!bike.isValid()) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const resp = await bikeRepository.update(bike);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la modification du vélo'});
    }
    return res.status(http.OK).json({'confirm': 'Vélo modifié', 'bike': bike});
}