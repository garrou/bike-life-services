const pool = require('../db/db');

class MemberRepository {

    /**
     * @param {String} memberId
     * @param {String} email 
     * @param {String} password
     * @param {Boolean} active
     * @returns QueryResult<any> 
     */
    static createMember = async (memberId, email, password, active) => {
        const client = await pool.connect();
        const res = await client.query('INSERT INTO member (member_id, email, password, active) VALUES ($1, $2, $3, $4)', 
                                        [memberId, email, password, active]);
        client.release(true);
        return res;
    }

    /**
     * @param {string} email 
     * @returns QueryResult<any>
     */
    static getActiveMember = async (email) => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM member WHERE email = $1 AND active = true', [email]);
        client.release(true);
        return res;
    }

    /**
     * @param {string} email 
     * @returns QueryResult<any>
     */
     static getMember = async (email) => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM member WHERE email = $1', [email]);
        client.release(true);
        return res;
    }

    /**
     * @param {Number} id 
     * @returns QueryResult<any> 
     */
    static getEmailById = async (id) => {
        const client = await pool.connect();
        const res = await client.query('SELECT email FROM member WHERE member_id = $1', [id]);
        client.release(true);
        return res;
    }

    /**
     * @param {Number} id 
     * @param {String} email 
     * @param {String} password 
     * @returns QueryResult<any>
     */
    static updateMember = async (id, email, password) => {
        const client = await pool.connect();
        const res = await client.query('UPDATE member SET email = $1, password = $2 WHERE id = $3', [email, password, id]);
        client.release(true);
        return res;
    }
}

module.exports = MemberRepository;