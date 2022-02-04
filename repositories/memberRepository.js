const pool = require('../db/db');
const Member = require('../models/Member');

/**
 * @param {Member} member
 * @returns QueryResult<any> 
 */
module.exports.create = async (member) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO members (member_id, email, password, active) 
                                    VALUES ($1, $2, $3, $4)`, 
                                    [member.id, member.email, member.password, member.active]);
    client.release(true);
    return res;
}

/**
 * @param {string} email 
 * @returns QueryResult<any>
 */
module.exports.getActive = async (email) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT members.* 
                                    FROM members 
                                    WHERE email = $1 AND active = true`, 
                                    [email]);
    client.release(true);
    return res;
}

/**
 * @param {string} email 
 * @returns QueryResult<any>
 */
module.exports.get = async (email) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT members.* 
                                    FROM members 
                                    WHERE email = $1`, 
                                    [email]);
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
                                    WHERE member_id = $1`, 
                                    [id]);
    client.release(true);
    return res;
}

/**
 * @param {Number} id 
 * @param {String} email 
 * @param {String} password 
 * @returns QueryResult<any>
 */
module.exports.update = async (id, email, password) => {
    const client = await pool.connect();
    const res = await client.query(`UPDATE members 
                                    SET email = $1, password = $2 
                                    WHERE id = $3`, 
                                    [email, password, id]);
    client.release(true);
    return res;
}