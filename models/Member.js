class Member {

    /** 
     * @param {int} id
     * @param {String} email 
     */
    constructor(id, email) {
        this.id = parseInt(id);
        this.email = email;
    }

}

module.exports = Member;