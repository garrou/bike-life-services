const componentRepository = require('../repositories/componentRepository');
const http = require('../constants/http.json');
const Change = require('../models/Change');
const Component = require('../models/Component');

module.exports.getBikeComponents = async (req, res) => {
    
    const { bikeId } = req.params;
    const resp = await componentRepository.getBikeComponents(bikeId);
    const components = Component.createFromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.getAlerts = async (req, res) => {

    const { memberId } = req.params;
    const resp = await componentRepository.getAlerts(memberId, 0.8);
    const components = Component.createFromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.changeComponent = async (req, res) => {

    const { componentId } = req.params;
    const { changedAt } = req.body;
    const resp = await componentRepository.changeComponent(componentId, changedAt);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le changement du composant'});
    }
    return res.status(http.OK).json({'confirm': 'Composant changé'});
}

module.exports.getChangeHistoric = async (req, res) => {

    const { componentId } = req.params;
    const resp = await componentRepository.getChangeHistoric(componentId);
    const changes = Change.createFromList(resp.rows);
    return res.status(http.OK).json(changes);
}