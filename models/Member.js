class User {

    /** 
     * @param {int} id
     * @param {string} email 
     * @param {string} password 
     */
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

}

module.exports = User;