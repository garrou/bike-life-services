const Component = require('../models/Component');
const ComponentChange = require('../models/ComponentChange');
const ComponentHistoric = require('../models/ComponentHistoric');
const ComponentRepository = require('../repositories/ComponentRepository');
const http = require('../constants/http.json');

class ComponentService {

    static getBikeComponents = async (req, res) => {
    
        try {
            const { bikeId } = req.params;
            const resp = await ComponentRepository.getBikeComponents(bikeId);
            const components = Component.fromList(resp.rows);
            return res.status(http.OK).json(components);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
    
    static getAlerts = async (req, res) => {
    
        try {
            const { memberId } = req.params;
            const resp = await ComponentRepository.getAlerts(memberId, 0.8);
            const components = Component.fromList(resp.rows);
            return res.status(http.OK).json(components);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
    
    static changeComponent = async (req, res) => {
    
        try {
            const { componentId } = req.params;
            const { changedAt, km } = req.body;
            await ComponentRepository.changeComponent(componentId, changedAt, km);
            await ComponentRepository.resetKm(componentId);
            return res.status(http.OK).json({'confirm': 'Composant changé'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
    
    static getChangeHistoric = async (req, res) => {
    
        try {
            const { componentId } = req.params;
            const resp = await ComponentRepository.getChangeHistoric(componentId);
            const changes = ComponentHistoric.fromList(resp.rows);
            return res.status(http.OK).json(changes);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
    
    static getNumOfComponentChangeByMemberByYear = async (req, res) => {
    
        try {
            const { memberId, year } = req.params;
            const resp = await ComponentRepository.getNumOfComponentChangeByMemberByYear(memberId, year);
            const changes = ComponentChange.fromList(resp.rows);
            return res.status(http.OK).json(changes);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
    
    static getAvgKmComponentChangeByMemberByYear = async (req, res) => {
        
        try {
            const { memberId, year } = req.params;
            const resp = await ComponentRepository.getAvgKmComponentChangeByMemberByYear(memberId, year);
            const changes = ComponentChange.fromList(resp.rows);
            return res.status(http.OK).json(changes);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
    
    static getTotalNbChange = async (req, res) => {
    
        try {
            const { memberId } = req.params;
            const resp = await ComponentRepository.getTotalNbChange(memberId);
            const changes = ComponentChange.fromList(resp.rows);
            return res.status(http.OK).json(changes);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }

    static getAvgPercentChanges = async (req, res) => {
        try {
            const { memberId } = req.params;
            const resp = await ComponentRepository.getAvgPercentChanges(memberId);
            const changes = ComponentChange.fromList(resp.rows);
            return res.status(http.OK).json(changes);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
}

module.exports = ComponentService;