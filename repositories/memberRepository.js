const pool = require('../db/db');

/**
 * @param {String} memberId
 * @param {String} email 
 * @param {String} password
 * @param {Boolean} active
 * @returns QueryResult<any> 
 */
module.exports.createMember = async (memberId, email, password, active) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO members (member_id, email, password, active) 
                                    VALUES ($1, $2, $3, $4)`, 
                                    [memberId, email, password, active]);
    client.release(true);
    return res;
}

/**
 * @param {string} email 
 * @returns QueryResult<any>
 */
module.exports.getActiveMember = async (email) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM members 
                                    WHERE email = $1 AND active = TRUE`, [email]);
    client.release(true);
    return res;
}

/**
 * @param {string} email 
 * @returns QueryResult<any>
 */
module.exports.getMember = async (email) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM members 
                                    WHERE email = $1`, [email]);
    client.release(true);
    return res;
}

/**
 * @param {Number} id 
 * @returns QueryResult<any> 
 */
module.exports.getEmailById = async (id) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT email 
                                    FROM members 
                                    WHERE member_id = $1`, [id]);
    client.release(true);
    return res;
}

/**
 * @param {Number} id 
 * @param {String} email 
 * @param {String} password 
 * @returns QueryResult<any>
 */
module.exports.updateMember = async (id, email, password) => {
    const client = await pool.connect();
    const res = await client.query(`UPDATE members 
                                    SET email = $1, password = $2 
                                    WHERE id = $3`, [email, password, id]);
    client.release(true);
    return res;
}