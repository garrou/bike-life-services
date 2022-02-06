const pool = require('../db/db');

/**
 * @param {Number} bikeId 
 * @returns QueryResult<any>
 */
module.exports.getBikeComponents = async (bikeId) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT components.* 
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
 * @param {Number} id
 * @param  {Number} bikeId
 * @param {String} type
 * @returns QueryResult<any>
 */
module.exports.create = async (componentId, bikeId, type) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components (component_id, duration, fk_component_type, active)
                                    VALUES ($1, (SELECT average_duration FROM components_type WHERE name = $2), $2, true)`,
                                    [componentId, type]);
    await client.query(`INSERT INTO bikes_components 
                        VALUES ($1, $2)`, 
                        [bikeId, componentId]);
    client.release(true);
    return res;
}

module.exports.getAlerts = async (memberId, percent) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT DISTINCT components.*, bikes.name
                                    FROM bikes, components, members_bikes, bikes_components
                                    WHERE members_bikes.fk_member = $1
                                    AND members_bikes.fk_bike = bikes.bike_id
                                    AND members_bikes.fk_bike = bikes_components.fk_bike
                                    AND bikes_components.fk_component = components.component_id
                                    AND components.active = true
                                    AND DATE_PART('day', NOW() - (SELECT CASE WHEN MAX(changed_at) IS NULL THEN bikes.added_at
                                                                            ELSE MAX(changed_at)
                                                                        END
                                                                    FROM components_changed
                                                                    WHERE components_changed.fk_component = component_id)) 
                                    * (bikes.average_km_week / 7) / components.duration >= $2`,
                                    [memberId, percent]);
    client.release(true);
    return res;
}

module.exports.changeComponent = async (componentId, changedAt) => {
    const client = await pool.connect();
    const res = await client.query(`INSERT INTO components_changed
                                    VALUES 
                                    ($1, 
                                    $2, 
                                    SELECT DATE_PART('day', $2 - (SELECT CASE WHEN MAX(changed_at) IS NULL THEN (SELECT bikes.added_at
                                                                                                                    FROM bikes, bikes_components
                                                                                                                    WHERE fk_component = $1
                                                                                                                    AND bikes_components.fk_bike = bikes.bike_id) 
                                                                                ELSE MAX(changed_at)
                                                                            END
                                                                    FROM components_changed
                                                                    WHERE components_changed.fk_component = $1)) * (bikes.average_km_week / 7) 
                                    FROM bikes, bikes_components
                                    WHERE bikes_components.fk_component = $1
                                    AND bikes_components.fk_bike = bikes.bike_id)`,
                                    [componentId, changedAt])
    client.release(true);
    return res;
}