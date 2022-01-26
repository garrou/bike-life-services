const pool = require('../db/db');

/**
 * @param {String} bikeId
 * @param {Number} memberId 
 * @param {String} name
 * @param {String} image 
 * @param {String} dateOfPurchase 
 * @param {Number} nbKm 
 * @returns QueryResult<any>
 */
module.exports.createBike = async (bikeId, memberId, name, image, dateOfPurchase, nbKm, electric) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO bike 
                                    (bike_id, name, image, date_of_purchase, fk_member, nb_km, electric) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
                                    [bikeId, name, image, dateOfPurchase, memberId, nbKm, electric]);
    client.release(true);
    return res;
}

/**
 * @param {Number} memberId 
 * @returns QueryResult<any>
 */
module.exports.getBikes = async (memberId) => {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM bike WHERE fk_member = $1', [memberId]);
    client.release(true);
    return res;
}

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.getBike = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM bike WHERE bike_id = $1', [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.deleteBike = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query('DELETE FROM bike WHERE bike_id = $1', [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {Bike} bike 
 * @returns QueryResult<any>
 */
module.exports.updateBike = async (bike) => {
    const client = await pool.connect();
    const res = await client.query(`UPDATE bike 
                                    SET name = $1, 
                                    image = $2,
                                    nb_km = $3,
                                    date_of_purchase = $4,
                                    electric = $5
                                    WHERE bike_id = $6`,
                                    [bike.name, 
                                    bike.image, 
                                    bike.nbKm, 
                                    bike.dateOfPurchase, 
                                    bike.electric,
                                    bike.id]);
    client.release(true);
    return res;
}

/**
 * @param {Number} bikeId
 * @param {Number} toAdd
 * @returns QueryResult<any>
 */
module.exports.updateBikeKm = async (bikeId, kmToAdd) => {
    const client = await pool.connect();
    const res = await client.query(`UPDATE bike 
                                    SET nb_km = nb_km + $1
                                    WHERE bike_id = $2`,
                                    [kmToAdd, bikeId]);
    client.release(true);
    return res;
}