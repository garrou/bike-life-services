const pool = require('../db/db');

/**
 * @returns {QueryResult<any>}
 */
module.exports.get = async () => {
    
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM components_type 
                                    ORDER BY name`);
    client.release(true);
    return res;
}

/**
 * @returns {QueryResult<any>}
 */
 module.exports.getWithoutBattery = async () => {

    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM components_type
                                    WHERE name <> 'Batterie' 
                                    ORDER BY name`);
    client.release(true);
    return res;
}