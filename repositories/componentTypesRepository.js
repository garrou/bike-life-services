const pool = require('../db/db');

/**
 * @returns QueryResult<any>
 */
module.exports.getNames = async () => {
    const client = await pool.connect();
    const res = await client.query(`SELECT name 
                                    FROM components_type 
                                    ORDER BY name`);
    client.release(true);
    return res;
}