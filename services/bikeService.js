const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const ComponentRepository = require('../repositories/ComponentRepository');
const ComponentTypeRepository = require('../repositories/ComponentTypesRepository');
const Generator = require('../utils/Generator');
const http = require('../constants/http.json');

class BikeService {
   
    static create = async (req, res) => {
    
        try {
            const { memberId } = req.params;
            const bike = Bike.fromJson(req.body);
    
            if (!bike.isValid()) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Informations invalides'});    
            }
            await BikeRepository.create(memberId, bike);
            const types = bike.electric 
                    ? (await ComponentTypeRepository.getAll()).rows
                    : (await ComponentTypeRepository.getAllWithoutBattery()).rows;
    
            types.forEach(async (type) => {
                await ComponentRepository.create(Generator.uuid(), bike.id, bike.totalKm, type.average_duration, type.name);
            });
            return res.status(http.CREATED).json({'confirm': 'Vélo ajouté', 'bike': bike});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur de communication avec le serveur'});
        }
    }
    
    static get = async (req, res) => {
        
        try {
            const { bikeId } = req.params;
            const resp = await BikeRepository.get(bikeId);
            const bike = Bike.fromList(resp.rows)[0];
            return res.status(http.OK).json(bike);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
    
    static getByMember = async (req, res) => {
    
        try {
            const { memberId } = req.params;
            const resp = await BikeRepository.getByMember(memberId);
            const bikes = Bike.fromList(resp.rows);
            return res.status(http.OK).json(bikes);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
    
    static delete = async (req, res) => {
    
        try {
            const { bikeId } = req.params;
            await BikeRepository.delete(bikeId);
            return res.status(http.OK).json({'confirm': 'Vélo supprimé'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
    
    static update = async (req, res) => {
        
        try {
            const bike = Bike.fromJson(JSON.parse(req.body.bike));
    
            if (!bike.isValid()) {
                return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
            }   
            await BikeRepository.update(bike);
            return res.status(http.OK).json({'confirm': 'Vélo modifié'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
}

module.exports = BikeService;