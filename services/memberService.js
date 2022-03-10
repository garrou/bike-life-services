const Utils = require('../utils/Utils');
const Mailer = require('../models/Mailer');
const Member = require('../models/Member');
const MemberRepository = require('../repositories/MemberRepository');
const Validator = require('../utils/Validator');
const http = require('../constants/http.json');

class MemberService {

    static signup = async (req, res) => {

        try {
            const { email, password } = req.body;
    
            if (!Validator.isEmail(email) || !Validator.isPassword(password)) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Informations invalides'});
            }
            const resp = await MemberRepository.get(email);

            if (resp.rowCount !== 0) {
                return res.status(http.CONFLICT).json({'confirm': 'Un compte est déjà associé à cet email.'});
            }
            const member = new Member(Utils.uuid(), email, await Utils.createHash(password), true);
            const url = Utils.generateUrl(member.id);
            await MemberRepository.create(member);
            new Mailer().sendConfirmationEmail(email, url);

            return res.status(http.CREATED).json({'confirm': 'Compte crée, veuillez confirmer votre email', 'member': member});
        } catch (err) {
            return res.status(http.BAD_REQUEST).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
    
    static login = async (req, res) => {
    
        try {
            const { email, password } = req.body;
            const resp = await MemberRepository.get(email);
        
            if (resp.rowCount === 0) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email ou mot passe incorrect.'});
            }
            if (!resp.rows[0].active) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Veuillez confirmer votre adresse email'});
            }
            const same = Utils.comparePassword(password, resp.rows[0].password);
        
            if (!same) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email ou mot de passe incorrect.'});
            }
            const member = new Member(resp.rows[0].member_id, email, resp.rows[0].password, resp.rows[0].active);
            return res.status(http.OK).json({'member': member, 'accessToken': Utils.createJwt(member)});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }

    static confirmEmail = async (req, res) => {

        try {
            const decoded = Utils.verifyEmailJwt(req.params.token);
            await MemberRepository.activeMember(decoded.memberId);
            return res.status(http.OK).json({'confirm': 'Email confirmé'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la confirmation du mail'});
        }
    }
    
    static updatePassword = async (req, res) => {
    
        try {
            const { password } = req.body;
    
            if (!Validator.isPassword(password)) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Le mot de passe doit contenir 8 caractères minimum.'});
            } 
            await MemberRepository.updatePassword(req.params.id, Utils.createHash(password));
            return res.status(http.OK).json({'confirm': 'Mot de passe modifié'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
    
    static updateEmail = async (req, res) => {
    
        try {
            const { id } = req.params;
            const { email } = req.body;
    
            if (!Validator.isEmail(email)) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email invalide.'});
            } 
            const resp = await memberRepository.get(email);
    
            if (resp.rowCount !== 0) {
                return res.status(http.CONFLICT).json({'confirm': 'Cet email est déjà associé à un compte.'});
            }
            await MemberRepository.updateEmail(id, email);
            return res.status(http.OK).json({'confirm': 'Email modifié'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Email modifié'});
        }
    }
    
    static getEmail = async (req, res) => {
        
        try {
            const resp = await MemberRepository.getEmailById(req.params.id);
            return res.status(http.OK).json({'email': resp.rows.length === 1 ? resp.rows[0].email : ''});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
}

module.exports = MemberService;