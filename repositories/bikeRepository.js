const pool = require('../db/db');

/**
 * @param {Number} memberId
 * @param {Bike} bike
 * @returns QueryResult<any>
 */
module.exports.create = async (memberId, bike) => {
    const client = await pool.connect();
    let res = await client.query(`INSERT INTO bikes
                                    VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
                                    [bike.id, bike.name, bike.electric, bike.nbUsedPerWeek, bike.kmPerWeek, bike.addedAt, bike.type]);
    res = await client.query(`INSERT INTO members_bikes VALUES ($1, $2)`, [memberId, bike.id]);
    client.release(true);
    return res;
}

/**
 * @param {Number} memberId 
 * @returns QueryResult<any>
 */
module.exports.getByMember = async (memberId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM bikes, members_bikes
                                    WHERE bike_id = fk_bike
                                    AND fk_member = $1`, 
                                    [memberId]);
    client.release(true);
    return res;
}

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.get = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM bikes 
                                    WHERE bike_id = $1`, 
                                    [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.delete = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query(`DELETE FROM bikes 
                                    WHERE bike_id = $1`, 
                                    [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {Bike} bike 
 * @returns QueryResult<any>
 */
 module.exports.update = async (bike) => {
    const client = await pool.connect();
    const res = await client.query(`UPDATE bikes 
                                    SET name = $1, electric = $2, average_use_week = $3, average_km_week = $4, bike_type = $5
                                    WHERE bike_id = $6`,
                                    [bike.name, bike.electric, bike.nbUsedPerWeek, bike.kmPerWeek, bike.type, bike.id]);
    client.release(true);
    return res;
}