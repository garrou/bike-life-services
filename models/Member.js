class Member {

    /** 
     * @param {Number} id
     * @param {String} email 
     * @param {String} password
     * @param {Boolean} active
     */
    constructor(id, email, password, active) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.active = active;
    }

}

module.exports = Member;