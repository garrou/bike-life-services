const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');

class Utils {

    /**
     * @returns {String}
     */
    static uuid = () => uuidv1();

    /**
     * @param {String} password 
     * @returns {Promise<String>}
     */
    static createHash = async (password) => {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    /**
     * @param {String} memberId
     * @returns {String}
     */
    static createJwt = (memberId) => jwt.sign({data: memberId}, process.env.SECRET_TOKEN);

    /**
     * @param {String} token 
     * @returns {JSON}
     */
    static verifyJwt = (token) => jwt.verify(token, process.env.SECRET_TOKEN);

    /**
     * @param {String} token 
     * @returns {JSON}
     */
    static verifyEmailJwt = (token) => jwt.verify(token, process.env.EMAIL_TOKEN);

    /**
     * @param {String} authorization
     * @returns {String}
     */
    static getMemberId = (authorization) => Utils.verifyJwt(authorization.split(' ')[1])['data'];

    /**
     * @param {String} memberId
     * @returns {String}
     */
    static generateUrl = (memberId) => {
        const token = jwt.sign({memberId: memberId}, process.env.EMAIL_TOKEN, {expiresIn: "1d"});
        return `https://${process.env.HOST}/confirmation/${token}`;
    }
    
    /**
     * @param {String} password 
     * @param {String} hash 
     * @returns {Promise<Boolean>} 
     */
    static comparePassword =  (password, hash) => bcrypt.compare(password, hash);
}

module.exports = Utils;