const pool = require('../db/db');

/**
 * @returns QueryResult<any>
 */
module.exports.getAll = async () => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM tips 
                                    ORDER BY write_date DESC`);
    client.release(true);
    return res;
}

/**
 * @param {Number} tipId 
 * @returns QueryResult<any> 
 */
module.exports.getById = async (tipId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM tips 
                                    WHERE tip_id = $1`, [tipId]);
    client.release(true);
    return res;
}

module.exports.getByType = async (componentType) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM tips 
                                    WHERE fk_topic LIKE $1`, [componentType]);
    client.release(true);
    return res;
}