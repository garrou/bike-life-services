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
            return res.status(http.OK).json({'confirm': 'Mot de passe modifié'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
    
    static updateEmail = async (req, res) => {
    
        try {
            const { email } = req.body;
            const memberId = Utils.getMemberId(req.headers['authorization']);
    
            if (!Validator.isEmail(email)) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email invalide.'});
            } 
            let resp = await MemberRepository.get(email);
    
            if (resp['rowCount'] !== 0) {
                return res.status(http.CONFLICT).json({'confirm': 'Cet email est déjà associé à un compte.'});
            }
            resp = await MemberRepository.updateEmail(memberId, email);

            if (resp['rowCount'] !== 1) {
                return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Impossible de modifier votre email'});
            }
            return res.status(http.OK).json({'confirm': 'Email modifié'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Email modifié'});
        }
    }
    
    static getEmail = async (req, res) => {
        
        try {
            const memberId = Utils.getMemberId(req.headers['authorization']);
            const resp = await MemberRepository.getEmailById(memberId);
            return res.status(http.OK).json({'email': resp['rowCount'] === 1 ? resp['rows'][0]['email'] : ''});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
}

module.exports = MemberService;