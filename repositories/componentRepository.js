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
    const res = await client.query(`INSERT INTO components (component_id, duration, fk_component_type, active)
                                    VALUES 
                                    ($1, 
                                    (SELECT average_duration 
                                            FROM components_type 
                                            WHERE name = $2), 
                                    $2,
                                    true)`,
                                    [id, type]);
    await client.query(`INSERT INTO bikes_components VALUES ($1, $2)`, [bikeId, id]);
    client.release(true);
    return res;
}

module.exports.getAlerts = async (memberId, percent) => {
    const client = await pool.connect();
    const res = await client.query(`SELECT components.*, MAX(revisions.made_at),
                                    FROM bikes, components, revisions, members_bikes, bikes_components, components_revisions
                                    WHERE members_bikes.fk_member = $1
                                    AND members_bikes.fk_bike = bikes.bike_id
                                    AND members_bikes.fk_bike = bikes_components.fk_bike
                                    AND bikes_components.fk_component = components.component_id
                                    AND components.active = true
                                    AND components_revisions.fk_component = components.component_id
                                    AND components_revisions.fk_revision = revisions.revision_id
                                    AND DATE_PART('day', NOW() - bikes.added_at) 
                                    * (bikes.average_km_week / 7) / components.duration >= $2`,
                                    [memberId, percent]);
    client.release(true);
    return res;
}