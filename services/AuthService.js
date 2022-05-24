const Mailer = require("../models/Mailer");
const Member = require("../models/Member");
const MemberRepository = require("../repositories/MemberRepository");
const Utils = require("../utils/Utils");
const constants = require("../constants/constants.json");
const generator = require('generate-password');
const http = require("../constants/http.json");

class AuthService {

    static signup = async (req, res) => {

        try {
            const { email, password } = req.body;
            const member = new Member(Utils.uuid(), email, await Utils.createHash(password), false);

            if (!member.isValid()) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Informations invalides'});
            }
            const resp = await MemberRepository.get(member.email);

            if (resp['rowCount'] !== 0) {
                return res.status(http.CONFLICT).json({'confirm': 'Un compte est déjà associé à cet email.'});
            }
            const url = Utils.generateUrl(member.id, 'confirmation');
            await MemberRepository.create(member);
            new Mailer().sendConfirmationEmail(email, url);

            return res.status(http.CREATED).json({'confirm': 'Compte créé, veuillez confirmer votre email', 'member': member});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }

    static login = async (req, res) => {

        try {
            const { email, password } = req.body;
            const resp = await MemberRepository.get(email);

            if (resp['rowCount'] === 0) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email ou mot passe incorrect.'});
            }
            if (!resp['rows'][0]['active']) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Veuillez confirmer votre adresse email'});
            }
            const same = await Utils.comparePassword(password, resp['rows'][0]['password']);

            if (!same) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email ou mot de passe incorrect.'});
            }
            return res.status(http.OK).json({'accessToken': Utils.createJwt(resp['rows'][0]['member_id'])});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }

    static confirmEmail = async (req, res) => {

        try {
            const decoded = Utils.verifyEmailJwt(req.params.token);
            await MemberRepository.setActive(decoded['memberId'], true);

            return res.writeHead(http.REDIRECT, {
                Location: 'https://bikeslife.fr'
            }).end();
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la confirmation du mail'});
        }
    }

    static forgotPassword = async (req, res) => {

        try {
            const { email } = req.body;
            const resp = await MemberRepository.get(email);

            if (resp['rowCount'] === 0) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Email incorrect.'});
            }
            const url = Utils.generateUrl(resp['rows'][0]['member_id'], 'reset');
            new Mailer().sendAskReset(email, url);

            return res.status(http.OK).json({'confirm': 'Un email pour récupérer votre mot de passe a été envoyé'});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la réinitialisation du mot de passe'});
        }
    }

    static resetPassword = async (req, res) => {

        try {
            const decoded = Utils.verifyEmailJwt(req.params.token);
            let password = generator.generate({
                length: constants.RESET_PASSWORD_SIZE,
                numbers: true
            });
            const resp = await MemberRepository.getEmailById(decoded['memberId']);

            new Mailer().sendNewPassword(resp['rows'][0]['email'], password);
            await MemberRepository.updatePassword(decoded['memberId'], await Utils.createHash(password));

            return res.writeHead(http.REDIRECT, {
                Location: 'https://bikeslife.fr'
            }).end();
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la réinitialisation du mot de passe'});
        }
    }
}

module.exports = AuthService;