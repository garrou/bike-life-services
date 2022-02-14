const pool = require('../db/db');

/**
 * @param {String} bikeId 
 * @returns QueryResult<any>
 */
module.exports.getBikeComponents = async (bikeId) => {
    
    const client = await pool.connect();
    const res = await client.query(`SELECT components.*, get_last_changed_date(component_id) AS changed_at
                                    FROM components, bikes_components
                                    WHERE fk_bike = $1
                                    AND component_id = fk_component
                                    AND active = true
                                    ORDER BY fk_component_type`,
                                    [bikeId]);
    client.release(true);
    return res;
}

/**
 * @param {String} componentId
 * @param  {String} bikeId
 * @param {String} type
 * @param {Number} duration
 * @returns QueryResult<any>
 */
module.exports.create = async (componentId, bikeId, duration, type) => {

    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components (component_id, duration, fk_component_type, active)
                                    VALUES ($1, $2, $3, true)`,
                                    [componentId, duration, type]);
    await client.query(`INSERT INTO bikes_components 
                        VALUES ($1, $2)`, 
                        [bikeId, componentId]);
    client.release(true);
    return res;
}

/**
 * @param {String} memberId 
 * @param {Number} percent 
 * @returns QueryResult<any>
 */
module.exports.getAlerts = async (memberId, percent) => {

    const client = await pool.connect();
    const res = await client.query(`SELECT DISTINCT components.*, get_last_changed_date(component_id) AS changed_at
                                    FROM bikes, components, members_bikes, bikes_components
                                    WHERE members_bikes.fk_member = $1
                                    AND members_bikes.fk_bike = bikes.bike_id
                                    AND members_bikes.fk_bike = bikes_components.fk_bike
                                    AND bikes_components.fk_component = components.component_id
                                    AND components.active = true
                                    AND DATE_PART('day', NOW() - get_last_changed_date(component_id)) 
                                        * (bikes.average_km_week / 7) / components.duration >= $2`,
                                    [memberId, percent]);
    client.release(true);
    return res;
}

/**
 * @param {String} componentId 
 * @param {Date} changedAt 
 * @returns QueryResult<any>
 */
module.exports.changeComponent = async (componentId, changedAt) => {

    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components_changed
                                    VALUES ($1, $2, (SELECT get_km_since_date_and_last_change($1, $2)))`,
                                    [componentId, changedAt]);
    client.release(true);
    return res;
}

/**
 * @param {String} componentId 
 * @returns QueryResult<any>
 */
module.exports.getChangeHistoric = async (componentId) => {

    const client = await pool.connect();
    const res = await client.query(`SELECT *
                                    FROM components_changed
                                    WHERE fk_component = $1
                                    ORDER by changed_at ASC`,
                                    [componentId]);
    client.release(true);
    return res;
}

module.exports.numberOfComponentChangeByMemberByYear = async (memberId, year) => {

    const client = await pool.connect();
    const res = await client.query(`SELECT components.fk_component_type, COUNT(*) AS num
                                    FROM bikes, components, members_bikes, bikes_components, components_changed
                                    WHERE members_bikes.fk_member = $1
                                    AND members_bikes.fk_bike = bikes.bike_id
                                    AND members_bikes.fk_bike = bikes_components.fk_bike
                                    AND bikes_components.fk_component = components.component_id
                                    AND components_changed.fk_component = components.component_id
                                    AND components.active = true
                                    AND EXTRACT(YEAR FROM changed_at) = $2
                                    GROUP BY components.fk_component_type`,
                                    [memberId, year]);
    client.release(true);
    return res;
}

module.exports.averageKmComponentChangeByMemberByYear = async (memberId, year) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT components.fk_component_type, AVG(components_changed.km_realised) AS average
                                    FROM bikes, components, members_bikes, bikes_components, components_changed
                                    WHERE members_bikes.fk_member = $1
                                    AND members_bikes.fk_bike = bikes.bike_id
                                    AND members_bikes.fk_bike = bikes_components.fk_bike
                                    AND bikes_components.fk_component = components.component_id
                                    AND components_changed.fk_component = components.component_id
                                    AND components.active = true
                                    AND EXTRACT(YEAR FROM changed_at) = $2
                                    GROUP BY components.fk_component_type`,
                                    [memberId, year]);
    client.release(true);
    return res;
}