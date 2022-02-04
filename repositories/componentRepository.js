const pool = require('../db/db');
const Component = require('../models/Component');

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.getBikeComponents = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM components, bikes_components
                                    WHERE fk_bike = $1
                                    AND component_id = fk_component
                                    ORDER BY fk_component_type`,
                                    [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {Number} id
 * @param  {Number} bikeId
 * @param {String} type
 * @returns QueryResult<any>
 */
module.exports.create = async (id, bikeId, type) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components (component_id, duration, fk_component_type)
                                    VALUES 
                                    ($1, 
                                    (SELECT average_duration 
                                            FROM components_type 
                                            WHERE name = $2), 
                                    $2)`,
                                    [id, type]);
    await client.query(`INSERT INTO bikes_components VALUES ($1, $2)`, [bikeId, id]);
    client.release(true);
    return res;
}