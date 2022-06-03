const Bike = require("../models/Bike");
const BikeRepository = require("../repositories/BikeRepository");
const MemberRepository = require('../repositories/MemberRepository');
const Utils = require('../utils/Utils');
const Validator = require('../utils/Validator');
const http = require('../constants/http.json');

class MemberService {
    
    static updatePassword = async (req, res) => {
    
        try {
            const { password } = req.body;
            const memberId = Utils.getMemberId(req.headers['authorization']);

            if (!Validator.isPassword(password)) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Le mot de passe doit contenir 8 caractères minimum.'});
            } 
            const resp = await MemberRepository.updatePassword(memberId, await Utils.createHash(password));

            if (resp['rowCount'] !== 1) {
                return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Impossible de modifier le mot de passe.'});
            }
            return res.status(http.OK).json({'confirm': 'Mot de passe modifié.'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }
    
    static getEmail = async (req, res) => {
        
        try {
            const memberId = Utils.getMemberId(req.headers['authorization']);
            const resp = await MemberRepository.getEmailById(memberId);
            return res.status(http.OK).json({'email': resp['rowCount'] === 1 ? resp['rows'][0]['email'] : ''});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }

    static checkAuth = async (req, res) => {

        try {
            const { password } = req.body;
            const memberId = Utils.getMemberId(req.headers['authorization']);
            const resp = await MemberRepository.getPasswordById(memberId);
            const same = await Utils.comparePassword(password, resp['rows'][0]['password']);

            if (!same) {
                return res.status(http.UNAUTHORIZED).json({'confirm': 'Mot de passe incorrect.'});
            }
            return res.status(http.OK).json({'confirm': 'Suppression de votre compte.'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }

    static delete = async (req, res) => {

        try {
            const memberId = Utils.getMemberId(req.headers['authorization']);
            const resp = await BikeRepository.getByMember(memberId);
            const bikes = Bike.fromList(resp['rows']);

            for (const bike of bikes) {
                await BikeRepository.delete(bike.id);
            }
            await MemberRepository.delete(memberId);
            return res.status(http.OK).json({'confirm': 'Compte correctement supprimé.'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }
}

module.exports = MemberService;