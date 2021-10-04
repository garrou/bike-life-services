const bcrypt = require('bcrypt');
const config = require('../config/config.json');
const constants = require('../constants/constants.json');
const jwt = require('jsonwebtoken');
const MemberRepository = require('../repositories/MemberRepository');
const Member = require('../models/Member');

module.exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (password.length < constants.MIN_PASSWORD_LENGTH) {
        return res.status(constants.UNAUTHORIZED).json({"confirm": "Le mot de passe doit contenir 8 caractères minimum."});
    } 
    const resp = await MemberRepository.getMember(email);

    if (resp.rows.length == 1) {
        return res.status(constants.UNAUTHORIZED).json({"confirm": "Un compte est déjà associé à cet email."});
    }
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    await MemberRepository.createMember(email, passHash);
    const member = new Member(null, email, passHash);

    return res.status(constants.CREATED).json(member);
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const resp = await MemberRepository.getMember(email);

    if (resp.rows === 0) {
        return res.status(constants.NOT_FOUND).json({"confirm": "Email ou mot passe incorrect."});
    }
    const same = await bcrypt.compare(password, resp.rows[0].password);
    
    if (!same) {
        return res.status(constants.NOT_FOUND).json({"confirm": "Email ou mot de passe incorrect."});
    }
    const member = new Member(resp.rows[0].member_id, email, password);
    const accessToken = jwt.sign(JSON.stringify(member), config.jwt.secretToken);

    return res.status(200).json({accessToken: accessToken});
}