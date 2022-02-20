const Component = require('../models/Component');
const ComponentChange = require('../models/ComponentChange');
const ComponentHistoric = require('../models/ComponentHistoric');
const componentRepository = require('../repositories/componentRepository');
const http = require('../constants/http.json');

module.exports.getBikeComponents = async (req, res) => {
    
    const { bikeId } = req.params;
    const resp = await componentRepository.getBikeComponents(bikeId);
    const components = Component.fromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.getAlerts = async (req, res) => {

    const { memberId } = req.params;
    const resp = await componentRepository.getAlerts(memberId, 0.8);
    const components = Component.fromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.changeComponent = async (req, res) => {

    const { componentId } = req.params;
    const { changedAt, km } = req.body;
    await componentRepository.changeComponent(componentId, changedAt, km);
    await componentRepository.resetKm(componentId);
    return res.status(http.OK).json({'confirm': 'Composant changé'});
}

module.exports.getChangeHistoric = async (req, res) => {

    const { componentId } = req.params;
    const resp = await componentRepository.getChangeHistoric(componentId);
    const changes = ComponentHistoric.fromList(resp.rows);
    return res.status(http.OK).json(changes);
}

module.exports.getNumOfComponentChangeByMemberByYear = async (req, res) => {

    const { memberId, year } = req.params;
    const resp = await componentRepository.getNumOfComponentChangeByMemberByYear(memberId, year);
    const changes = ComponentChange.fromList(resp.rows);
    return res.status(http.OK).json(changes);
}

module.exports.getAvgKmComponentChangeByMemberByYear = async (req, res) => {
 
    const { memberId, year } = req.params;
    const resp = await componentRepository.getAvgKmComponentChangeByMemberByYear(memberId, year);
    const changes = ComponentChange.fromList(resp.rows);
    return res.status(http.OK).json(changes);
}

module.exports.getTotalNbChange = async (req, res) => {

    const { memberId } = req.params;
    const resp = await componentRepository.getTotalNbChange(memberId);
    const changes = ComponentChange.fromList(resp.rows);
    return res.status(http.OK).json(changes);
}