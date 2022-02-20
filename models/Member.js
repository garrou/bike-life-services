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

    /**
     * @param {Array} records 
     * @returns {Array<Member>}
     */
     static fromList = (records) => { 
        return records
                .map((member) => new Member(member.member_id, 
                                            member.email, 
                                            member.password, 
                                            member.active));
    }
}

module.exports = Member;