const Validator = require('../utils/Validator');

class Member {

    /**
     * @param {String} id
     * @param {String} email 
     * @param {String} password
     * @param {Boolean} active
     */
    constructor(id, email, password, active) {
        this.id = id;
        this.email = email.trim();
        this.password = password.trim();
        this.active = active;
    }

    /**
     * @returns {Boolean}
     */
    isValid = () => Validator.isUUID(this.id)
                && Validator.isEmail(this.email)
                && Validator.isPassword(this.password);

    /**
     * @param {Array<JSON>} records
     * @returns {Array<Member>}
     */
     static fromList = (records) => { 
        return records
                .map((member) => new this(member['member_id'],
                                            member['email'],
                                            member['password'],
                                            member['active']));
    }
}

module.exports = Member;