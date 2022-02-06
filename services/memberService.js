const bcrypt = require('bcrypt');
const http = require('../constants/http.json');
const jwt = require('jsonwebtoken');
const memberRepository = require('../repositories/memberRepository');
const Member = require('../models/Member');
const { v1: uuidv1 } = require('uuid');
const validator = require('../utils/validator');
require('dotenv').config();

module.exports.signup = async (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email) || !validator.isPassword(password)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    let resp = await memberRepository.get(email);

    if (resp.rowCount == 1) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Un compte est déjà associé à cet email.'});
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    const member = new Member(uuidv1(), email, passHash, true);
    resp = await memberRepository.create(member);

    if (resp.rowCount !== 1) {
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

module.exports.update = async (req, res) => {

    const { id, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Email invalide'});
    }
    if (!validator.isPassword(password)) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Le mot de passe doit contenir 8 caractères minimum.'});
    } 
    const resp = await memberRepository.get(email);

    if (resp.rowCount == 1) {
        return res.status(http.FORBIDDEN).json({'confirm': 'Un compte est déjà associé à cet email.'});
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    await memberRepository.update(id, email, passHash);
    return res.status(http.OK).json({'confirm': 'Compte modifié'});
}

module.exports.getEmail = async (req, res) => {
    
    const { id } = req.params;
    const resp = await memberRepository.getEmailById(id);
    
    if (resp.rowCount !== 1) {
        return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': "Erreur durant la récupération de l'email"});
    }
    return res.status(http.OK).json({'email': resp.rows[0].email});
}