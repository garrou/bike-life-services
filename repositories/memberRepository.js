const pool = require('../db/db');
const Member = require('../models/Member');

class MemberRepository {

    /**
     * @param {Member} member
     * @returns {QueryResult<any>}
     */
    static create = async (member) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO members (member_id, email, password, active) 
                                VALUES ($1, $2, $3, $4)`, 
                                [member.id, member.email, member.password, member.active]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {string} email 
     * @returns {QueryResult<any>}
     */
    static get = async (email) => { 

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM members 
                                            WHERE email = $1`, 
                                            [email]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @returns {QueryResult<any>}
     */
    static getEmailById = async (id) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT email 
                                            FROM members 
                                            WHERE member_id = $1`, 
                                            [id]);
            client.release(true);
            return res;

        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @param {String} email 
     * @returns {QueryResult<any>}
     */
    static updateEmail = async (id, email) => {
        
        try {
            const client = await pool.connect();
            await client.query(`UPDATE members 
                                SET email = $1
                                WHERE member_id = $2`, 
                                [email, id]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @param {String} password 
     * @returns {QueryResult<any>}
     */
    static updatePassword = async (id, password) => {
        
        try {
            const client = await pool.connect();
            await client.query(`UPDATE members 
                                SET password = $1
                                WHERE member_id = $2`, 
                                [password, id]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @returns {QueryResult<any>}
     */
     static activeMember = async (id) => {
        
        try {
            const client = await pool.connect();
            await client.query(`UPDATE members 
                                SET active = true
                                WHERE member_id = $1`, 
                                [id]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = MemberRepository;