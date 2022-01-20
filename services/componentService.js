const Component = require('../models/Component');
const componentRepository = require('../repositories/componentRepository');
const componentTypeRepository = require('../repositories/componentTypesRepository');
const validator = require('../utils/validator');
const http = require('../constants/http.json')

module.exports.getBikeComponents = async (req, res) => {
    const { bikeId } = req.query;
    const resp = await componentRepository.getBikeComponents(bikeId);
    return res.status(http.OK).json(resp.rows);
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
    const { brand, image, km, duration, type, date, bikeId } = req.body;

    const types = await componentTypeRepository.getTypes();
    const finded = types.rows.find((e) => e.name === type) !== undefined;

    if (!validator.isValidKm(km) 
        || !validator.isValidKm(duration)
        || !finded) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    const resp = await componentRepository.add(brand, image, km, duration, type, date, bikeId);

    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant l'ajout du composant"});
    }
    const component = new Component(0, bikeId, brand, km, date, duration, image, type);
    return res.status(http.CREATED).json({'confirm': 'Composant ajouté', 'component': JSON.stringify(component)});
}