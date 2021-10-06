const client = require('../config/db');

class MemberRepository {

    /**
     * @param {string} email 
     * @param {string} password 
     * @returns Promise<QueryResult<any>>
     */
    static createMember = async (email, password) => {
        return await client.query('insert into member (email, password) values ($1, $2)', [email, password]);
    }

    /**
     * @param {string} email 
     * @returns Promise<QueryResult<any>>
     */
    static getMember = async (email) => {
        return await client.query('select * from member where email like $1', [email]);
    }
}

module.exports = MemberRepository;