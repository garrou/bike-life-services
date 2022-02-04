const Component = require('../models/Component');
const bikeRepository = require('../repositories/bikeRepository');
const componentRepository = require('../repositories/componentRepository');
const componentTypeRepository = require('../repositories/componentTypesRepository');
const { v1: uuidv1 } = require('uuid');
const validator = require('../utils/validator');
const http = require('../constants/http.json');
const { createFromList } = require('../models/Component');

module.exports.getBikeComponents = async (req, res) => {
    
    const { bikeId } = req.params;
    const resp = await componentRepository.getBikeComponents(bikeId);
    const components = createFromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.update = async (req, res) => {

    const component = JSON.parse(req.body.component);

    if (!validator.isKm(component.km) && !validator.isKm(component.duration)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const resp = await componentRepository.update(component);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la modification du composant'});
    }
    return res.status(http.OK).json({'confirm': 'Composant modifié'});
}

module.exports.create = async (req, res) => {

    const { brand, image, km, duration, type, date } = req.body;
    const { bikeId } = req.params;

    if (!validator.isKm(km) 
        || !validator.isKm(duration)
        || !validator.isDate(date)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const componentId = uuidv1();
    const resp = await componentRepository.create(componentId, brand, image, km, duration, type, date, bikeId);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout du composant"});
    }
    const component = new Component(componentId, bikeId, brand, km, date, duration, image, type);
    return res.status(http.CREATED).json({'confirm': 'Composant ajouté', 'component': component});
}