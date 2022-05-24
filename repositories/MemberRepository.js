const pool = require('../db/db');

class MemberRepository {

    /**
     * @param {Member} member
     * @returns {Promise<void>}
     */
    static create = async (member) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO members (member_id, email, password, active) 
                                VALUES ($1, $2, $3, $4)`, 
                                [member.id, member.email, member.password, member.active]);
            client.release();
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {string} email 
     * @returns {Promise<any>}
     */
    static get = async (email) => { 

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM members 
                                            WHERE email = $1`, 
                                            [email]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @returns {Promise<any>}
     */
    static getEmailById = async (id) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT email 
                                            FROM members 
                                            WHERE member_id = $1`, 
                                            [id]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @param {String} email
     * @returns {Promise<any>}
     */
    static updateEmail = async (id, email) => {
        
        try {
            const client = await pool.connect();
            const res = await client.query(`UPDATE members 
                                SET email = $1
                                WHERE member_id = $2`, 
                                [email, id]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id 
     * @param {String} password
     * @returns {Promise<any>}
     */
    static updatePassword = async (id, password) => {
        
        try {
            const client = await pool.connect();
            const res = await client.query(`UPDATE members 
                                SET password = $1
                                WHERE member_id = $2`, 
                                [password, id]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id
     * @param {Boolean} active
     * @returns {Promise<void>}
     */
     static setActive = async (id, active) => {
        
        try {
            const client = await pool.connect();
            await client.query(`UPDATE members 
                                SET active = $1
                                WHERE member_id = $2`,
                                [active, id]);
            client.release();
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id
     * @returns {Promise<any>}
     */
    static getPasswordById = async (id) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT password
                                            FROM members 
                                            WHERE member_id = $1`,
                                            [id]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} id
     * @returns {Promise<void>}
     */
    static delete = async (id) => {

        try {
            const client = await pool.connect();
            await client.query(`DELETE FROM members 
                                            WHERE member_id = $1`,
                                            [id]);
            client.release();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = MemberRepository;