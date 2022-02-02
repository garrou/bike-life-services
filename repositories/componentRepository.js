const pool = require('../db/db');

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.getBikeComponents = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM components
                                    WHERE fk_bike = $1 
                                    AND archived = false 
                                    ORDER BY component_type`, 
                                    [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {Number} memberId 
 * @param {Boolean} archived
 * @param {String} type
 * @returns QueryResult<any>
 */
module.exports.getArchivedMemberComponents = async (memberId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT * 
                                    FROM components 
                                    JOIN bikes ON bikes.bike_id = components.fk_bike
                                    JOIN members ON members.member_id = bikes.fk_member
                                    WHERE members.member_id = $1 
                                    AND archived = true`, 
                                    [memberId]);
    client.release(true);
    return res;
}

/**
 * @param {Component} component 
 * @returns QueryResult<any>
 */
module.exports.updateComponent = async (comp) => {
 const client = await pool.connect();
 const res = await client.query(`UPDATE components
                                SET brand = $1, date_of_purchase = $2, nb_km = $3, duration = $4, image = $5, component_type = $6, archived = $7, fk_bike = $8
                                WHERE component_id = $9`,
                                [comp.brand, comp.dateOfPurchase, comp.km, comp.duration, comp.image, comp.type, comp.archived, comp.bikeId, comp.id]);
 client.release(true);
 return res;
}

/**
 * @param {Number} km 
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.addKm = async (km, bikeId) => {
    const client = await pool.connect();
    const res = await client.query(`UPDATE components 
                                    SET nb_km = nb_km + $1 
                                    WHERE fk_bike = $2 
                                    AND component_type != 'Batterie'
                                    AND archived = false`,
                                    [km, bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {String} componentId
 * @param {String} brand 
 * @param {String} image 
 * @param {float} km 
 * @param {float} duration 
 * @param {String} type 
 * @param {Date} date 
 * @param {Number} bikeId
 * @param {Boolean} archived
 * @returns QueryResult<any>
 */
module.exports.add = async (componentId, brand, image, km, duration, type, date, bikeId, archived) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components
                                    (component_id, brand, image, nb_km, duration, component_type, date_of_purchase, fk_bike, archived)
                                    VALUES
                                    ($1, $2, $3, $4, $5, $6, $7, $8)`, 
                                    [componentId, brand, image, km, duration, type, date, bikeId, archived]);
    client.release(true);
    return res;
}

/**
 * @param {Number} componentId
 * @param {Number} bikeId
 * @param {String} type
 * @param {Date} dateOfPurchase
 * @param {Number} nbKm
 * @returns QueryResult<any>
 */
module.exports.initBikeComponents = async (componentId, bikeId, type, dateOfPurchase, nbKm) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components
                                    (component_id, nb_km, duration, component_type, date_of_purchase, fk_bike, archived)
                                    VALUES 
                                    ($1, 
                                    $2, 
                                    (SELECT CASE WHEN AVG(duration) IS NULL THEN (SELECT average_duration 
                                                                                    FROM components_type 
                                                                                    WHERE name = $3)
                                                ELSE AVG(duration)
                                                END
                                    FROM components 
                                    WHERE component_type = $3), 
                                    $3, 
                                    $4, 
                                    $5,
                                    false)`,
                                    [componentId, nbKm, type, dateOfPurchase, bikeId]);
    client.release(true);
    return res;
}