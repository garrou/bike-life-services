const pool = require('../db/db');

class MemberRepository {

    /**
     * @param {string} email 
     * @param {string} password
     * @returns QueryResult<any> 
     */
    static createMember = async (email, password) => {
        const client = await pool.connect();
        const res = await client.query('insert into member (email, password) values ($1, $2)', [email, password]);
        client.release(true);
        return res;
    }

    /**
     * @param {string} email 
     * @returns QueryResult<any>
     */
    static getMember = async (email) => {
        const client = await pool.connect();
        const res = await client.query('select * from member where email like $1', [email]);
        client.release(true);
        return res;
    }

    /**
     * @param {int} id 
     * @param {String} email 
     * @param {String} password 
     * @returns QueryResult<any>
     */
    static updateMember = async (id, email, password) => {
        const client = await pool.connect();
        const res = await client.query('update member set email = $1, password = $2 where id = $3', [email, password, id]);
        client.release(true);
        return res;
    }
}

module.exports = MemberRepository;