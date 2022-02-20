const Bike = require('../models/Bike');
const bikeRepository = require('../repositories/bikeRepository');
const componentRepository = require('../repositories/componentRepository');
const componentTypeRepository = require('../repositories/componentTypesRepository');
const generator = require('../utils/generator');
const http = require('../constants/http.json');

module.exports.create = async (req, res) => {
    
    const { memberId } = req.params;
    const bike = Bike.fromJson(req.body);

    if (!bike.isValid()) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});    
    }
    const resp = await bikeRepository.create(memberId, bike);
    
    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout"});
    }
    const types = bike.electric 
                ? (await componentTypeRepository.get()).rows
                : (await componentTypeRepository.getWithoutBattery()).rows;

    types.forEach(async (type) => {
        await componentRepository.create(generator.uuid(), bike.id, bike.totalKm, type.average_duration, type.name);
    });
    return res.status(http.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
}

module.exports.get = async (req, res) => {

    const { bikeId } = req.params;
    const resp = await bikeRepository.get(bikeId);
    const bike = Bike.fromList(resp.rows)[0];
    return res.status(http.OK).json(bike);
}

module.exports.getByMember = async (req, res) => {

    const { memberId } = req.params;
    const resp = await bikeRepository.getByMember(memberId);
    const bikes = Bike.fromList(resp.rows);
    return res.status(http.OK).json(bikes);
}

module.exports.delete = async (req, res) => {

    const { bikeId } = req.params;
    const resp = await bikeRepository.delete(bikeId);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la suppression'});
    }
    return res.status(http.OK).json({'confirm': 'Vélo supprimé'});
}

module.exports.update = async (req, res) => {
    
    const bike = Bike.fromJson(JSON.parse(req.body.bike));
    
    if (!bike.isValid()) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const resp = await bikeRepository.update(bike);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la mise à jour'});
    }
    return res.status(http.OK).json({'confirm': 'Vélo modifié'});
}