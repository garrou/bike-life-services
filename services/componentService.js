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
    const components = Component.createFromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.update = async (req, res) => {
    const component = JSON.parse(req.body.component);

    if (!validator.isValidKm(component.km) && !validator.isValidKm(component.duration)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const resp = await componentRepository.updateComponent(component);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la modification du composant'});
    }
    return res.status(http.OK).json({'confirm': 'Composant modifié'});
}

module.exports.add = async (req, res) => {
    const { brand, image, km, duration, type, date } = req.body;
    const { bikeId } = req.params;
    const types = await componentTypeRepository.getTypesNames();
    const finded = types.rows.find(elt => elt.name === type) !== undefined;

    if (!validator.isValidKm(km) 
        || !validator.isValidKm(duration)
        || !validator.isDate(date)
        || !finded) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const componentId = uuidv1();
    const resp = await componentRepository.add(componentId, brand, image, km, duration, type, date, bikeId);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout du composant"});
    }
    const component = new Component(componentId, bikeId, brand, km, date, duration, image, type);
    return res.status(http.CREATED).json({'confirm': 'Composant ajouté', 'component': component});
}

module.exports.initComponents = async (req, res) => {
    const { bikeId } = req.params;
    const { electric, date_of_purchase, nb_km } = (await bikeRepository.getBike(bikeId)).rows[0];
    let types = (await componentTypeRepository.getTypesNames()).rows;

    if (!electric) {
        types = types.filter(elt => elt.name !== 'Batterie');
    }
    types.forEach(async (type) => {
        await componentRepository.initBikeComponents(uuidv1(), bikeId, type.name, date_of_purchase, nb_km);
    });
    
    return res.status(http.CREATED).json({'confirm': 'Composants ajoutés'});
}

module.exports.getArchivedMemberComponents = async (req, res) => {
    const { memberId } = req.params;
    const resp = await componentRepository.getArchivedMemberComponents(memberId);
    const components = createFromList(resp.rows);
    return res.status(http.OK).json(components);
}