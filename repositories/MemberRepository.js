const pool = require('../db/db');

class MemberRepository {

    /**
     * @param {string} email 
     * @param {string} password 
     * @returns Promise<QueryResult<any>>
     */
    static createMember = async (email, password) => {
        const client = await pool.connect();
        await client.query('insert into member (email, password) values ($1, $2)', [email, password]);
        client.release(true);
    }

    /**
     * @param {string} email 
     * @returns Promise<QueryResult<any>>
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
     * @returns Promise<QueryResult<any>>
     */
    static updateMember = async (id, email, password) => {
        const client = await pool.connect();
        await client.query('update member set email = $1, password = $2 where id = $3', [email, password, id]);
        client.release(true);
    }
}

module.exports = MemberRepository;