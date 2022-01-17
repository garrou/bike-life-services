const bcrypt = require('bcrypt');
const config = require('../config/config.json');
const constants = require('../constants/constants.json');
const jwt = require('jsonwebtoken');
const MemberRepository = require('../repositories/MemberRepository');
const Member = require('../models/Member');
const validator = require('../utils/validator');

module.exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Email invalide'});
    }
    if (!validator.isGoodLenPass(password)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Le mot de passe doit contenir 8 caractères minimum.'});
    } 
    const resp = await MemberRepository.getMember(email);

    if (resp.rowCount == 1) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Un compte est déjà associé à cet email.'});
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    await MemberRepository.createMember(email, passHash);
    const member = new Member(null, email, passHash);

    return res.status(constants.CREATED).json({'confirm': 'Compte crée', 'member': member});
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const resp = await MemberRepository.getMember(email);
    
    if (resp.rowCount === 0) {
        return res.status(constants.NOT_FOUND).json({'confirm': 'Email ou mot passe incorrect.'});
    }
    const same = await bcrypt.compare(password, resp.rows[0].password);
    
    if (!same) {
        return res.status(constants.NOT_FOUND).json({'confirm': 'Email ou mot de passe incorrect.'});
    }
    const member = new Member(resp.rows[0].member_id, email);
    const accessToken = jwt.sign(JSON.stringify(member), config.jwt.secretToken);

    return res.status(constants.OK).json({'member': member, 'accessToken': accessToken});
}

module.exports.getMemberById = async (req, res) => {
    return await MemberRepository.getMember(req.params.id);
}

module.exports.updateMember = async (req, res) => {
    const { id, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Email invalide'});
    }
    if (!validator.isGoodLenPass(password)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Le mot de passe doit contenir 8 caractères minimum.'});
    } 
    const resp = await MemberRepository.getMember(email);

    if (resp.rowCount == 1) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Un compte est déjà associé à cet email.'});
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    await MemberRepository.updateMember(id, email, passHash);

    return res.status(constants.OK).json({'confirm': 'Compte modifié'});
}