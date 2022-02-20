require('dotenv').config();
const Member = require('../models/Member');
const bcrypt = require('bcrypt');
const generator = require('../utils/generator');
const http = require('../constants/http.json');
const jwt = require('jsonwebtoken');
const memberRepository = require('../repositories/memberRepository');
const validator = require('../utils/validator');

module.exports.signup = async (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email) || !validator.isPassword(password)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    let resp = await memberRepository.get(email);

    if (resp.rowCount !== 0) {
        return res.status(http.CONFLICT).json({'confirm': 'Un compte est déjà associé à cet email.'});
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    const member = new Member(generator.uuid(), email, passHash, true);
    resp = await memberRepository.create(member);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la création du compte'});
    }
    return res.status(http.CREATED).json({'confirm': 'Compte crée', 'member': member});
}

module.exports.login = async (req, res) => {

    const { email, password } = req.body;
    const resp = await memberRepository.getActive(email);
    
    if (resp.rowCount === 0) {
        return res.status(http.NOT_FOUND).json({'confirm': 'Email ou mot passe incorrect.'});
    }
    const same = await bcrypt.compare(password, resp.rows[0].password);
    
    if (!same) {
        return res.status(http.NOT_FOUND).json({'confirm': 'Email ou mot de passe incorrect.'});
    }
    const member = new Member(resp.rows[0].member_id, email, resp.rows[0].password, true);
    const accessToken = jwt.sign({data: JSON.stringify(member) }, process.env.SECRET_TOKEN);
    return res.status(http.OK).json({'member': member, 'accessToken': accessToken});
}

module.exports.updatePassword = async (req, res) => {

    const { id } = req.params;
    const { password } = req.body;

    if (!validator.isPassword(password)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Le mot de passe doit contenir 8 caractères minimum.'});
    } 
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    const resp = await memberRepository.updatePassword(id, passHash);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la mise à jour.'});
    }
    return res.status(http.OK).json({'confirm': 'Mot de passe modifié'});
}

module.exports.updateEmail = async (req, res) => {

    const { id } = req.params;
    const { email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Email invalide.'});
    } 
    let resp = await memberRepository.get(email);

    if (resp.rowCount !== 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Cet email est déjà associé à un compte.'});
    }
    resp = await memberRepository.updateEmail(id, email);

    if (resp.rowCount === 0) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la mise à jour.'});
    }
    return res.status(http.OK).json({'confirm': 'Email modifié'});
}

module.exports.getEmail = async (req, res) => {
    
    const { id } = req.params;
    const resp = await memberRepository.getEmailById(id);
    return res.status(http.OK).json({'email': resp.rows.length === 1 ? resp.rows[0].email : ''});
}