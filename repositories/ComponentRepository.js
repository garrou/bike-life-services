const pool = require('../db/db');

class ComponentRepository {

    /**
     * @param {String} bikeId 
     * @returns {Promise<any>}
     */
    static getBikeComponents = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT components.*, get_last_changed_date(component_id) AS changed_at
                                            FROM components, bikes_components
                                            WHERE component_id = fk_component
                                            AND fk_bike = $1
                                            AND active = true
                                            ORDER BY total_km / duration DESC, fk_component_type ASC`,
                                            [bikeId]);
            client.release();
            return res;
        } catch (err) {

            throw err;
        }
    }

    /**
     * @param {String} componentId
     * @param {String} bikeId
     * @param {Number} km
     * @param {Number} duration
     * @param {String} type
     */
    static create = async (componentId, bikeId, km, duration, type) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO components (component_id, duration, fk_component_type, active, total_km, price, brand)
                                VALUES ($1, $2, $3, true, $4, 0, 'Inconnue')`,
                                [componentId, duration, type, km]);
            await client.query(`INSERT INTO bikes_components (fk_bike, fk_component)
                                VALUES ($1, $2)`, 
                                [bikeId, componentId]);
            client.release();
        } catch (err) {
            throw err;
        }
    }
    
    /**
     * @param {Component} component 
     * @returns {Promise<any>}
     */
     static updateComponent = async (component) => {

        try {
            const client = await pool.connect();
            await client.query(`UPDATE components
                                SET duration = $1, active = $2, total_km = $3, fk_component_type = $4, price = ROUND($5, 2), brand = $6
                                WHERE component_id = $7`,
                                [component.duration, component.active, component.totalKm, component.type, component.price, component.brand, component.id]);
            client.release();
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId
     * @param {Number} percent 
     * @returns {Promise<any>}
     */
    static getNbAlerts = async (bikeId, percent) => {
        
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT COUNT(*) AS total
                                            FROM bikes, components, members_bikes, bikes_components
                                            WHERE members_bikes.fk_bike = $1
                                            AND members_bikes.fk_bike = bikes.bike_id
                                            AND members_bikes.fk_bike = bikes_components.fk_bike
                                            AND bikes_components.fk_component = components.component_id
                                            AND components.active = true
                                            AND components.total_km / components.duration >= $2`,
                                            [bikeId, percent]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} componentId 
     * @param {ComponentChange} change
     */
    static changeComponent = async (componentId, change) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO components_changed (fk_component, changed_at, km_realised, price, brand)
                                VALUES ($1, $2, $3, ROUND($4, 2), $5)`,
                                [componentId, change.changedAt, change.kmRealised, change.price, change.brand]);
            await client.query(`UPDATE components
                                SET total_km = (SELECT get_km_since_changed_date($1, $2))
                                WHERE component_id = $1`,
                                [componentId, change.changedAt]);
            client.release();
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} componentId 
     * @returns {Promise<any>}
     */
    static getChangeHistoricByComponent = async (componentId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT *
                                            FROM components_changed
                                            WHERE fk_component = $1
                                            ORDER BY changed_at DESC`,
                                            [componentId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} memberId 
     * @param {Number} year 
     * @returns {Promise<any>}
     */
    static getNumOfComponentChangeByMemberByYear = async (memberId, year) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT components.fk_component_type AS label, COUNT(*) AS value
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
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    
    /**
     * @param {String} memberId 
     * @param {Number} year 
     * @returns {Promise<any>}
     */
    static getAvgKmComponentChangeByMemberByYear = async (memberId, year) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT components.fk_component_type AS label, AVG(components_changed.km_realised) AS value
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
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} memberId 
     * @returns {Promise<any>}
     */
    static getTotalNbChangeByMember = async (memberId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT EXTRACT(YEAR FROM components_changed.changed_at) AS label, COUNT(*) AS value
                                            FROM bikes, components, members_bikes, bikes_components, components_changed
                                            WHERE members_bikes.fk_member = $1
                                            AND members_bikes.fk_bike = bikes.bike_id
                                            AND members_bikes.fk_bike = bikes_components.fk_bike
                                            AND bikes_components.fk_component = components.component_id
                                            AND components_changed.fk_component = components.component_id
                                            AND components.active = true
                                            GROUP BY EXTRACT(YEAR FROM components_changed.changed_at)
                                            ORDER BY EXTRACT(YEAR FROM components_changed.changed_at)`,
                                            [memberId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} memberId 
     * @returns {Promise<any>}
     */
    static getAvgPercentChangesByMember = async (memberId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT components.fk_component_type AS label, 
                                                ROUND(AVG(components_changed.km_realised) / components.duration * 100, 2) AS value
                                            FROM bikes, components, members_bikes, bikes_components, components_changed
                                            WHERE members_bikes.fk_member = $1
                                            AND members_bikes.fk_bike = bikes.bike_id
                                            AND members_bikes.fk_bike = bikes_components.fk_bike
                                            AND bikes_components.fk_component = components.component_id
                                            AND components_changed.fk_component = components.component_id
                                            AND components.active = true
                                            GROUP BY components.fk_component_type, components.duration
                                            ORDER BY value DESC`,
                                            [memberId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {Promise<any>}
     */
    static getNbChangeByBike = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT EXTRACT(YEAR FROM components_changed.changed_at) AS label, COUNT(*) AS value
                                            FROM bikes_components, components_changed
                                            WHERE bikes_components.fk_bike = $1
                                            AND bikes_components.fk_component = components_changed.fk_component
                                            GROUP BY EXTRACT(YEAR FROM components_changed.changed_at)`,
                                            [bikeId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {Promise<any>}
     */
    static getAvgPercentChangesByBike = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT components.fk_component_type AS label, 
                                                    ROUND(AVG(components_changed.km_realised) / components.duration * 100, 2) AS value
                                            FROM components, bikes_components, components_changed
                                            WHERE bikes_components.fk_bike = $1
                                            AND bikes_components.fk_component = components_changed.fk_component
                                            GROUP BY components.fk_component_type, components.duration
                                            ORDER BY value DESC`,
                                            [bikeId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {Promise<any>}
     */
    static getNumOfComponentChangedByBike = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT components.fk_component_type AS label, COUNT(*) AS value
                                            FROM components, bikes_components, components_changed
                                            WHERE bikes_components.fk_bike = $1
                                            AND bikes_components.fk_component = components.component_id
                                            AND components_changed.fk_component = components.component_id
                                            AND components.active = true
                                            GROUP BY components.fk_component_type`,
                                            [bikeId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} memberId 
     * @returns {Promise<any>}
     */
    static getSumPriceComponentsByMember = async (memberId) => {
        
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT EXTRACT(YEAR FROM components_changed.changed_at) AS label, SUM(components_changed.price) AS value
                                        FROM bikes, components, members_bikes, bikes_components, components_changed
                                        WHERE members_bikes.fk_member = $1
                                        AND members_bikes.fk_bike = bikes.bike_id
                                        AND members_bikes.fk_bike = bikes_components.fk_bike
                                        AND bikes_components.fk_component = components.component_id
                                        AND components_changed.fk_component = components.component_id
                                        AND components.active = true
                                        GROUP BY EXTRACT(YEAR FROM components_changed.changed_at)
                                        ORDER BY EXTRACT(YEAR FROM components_changed.changed_at)`,
                                        [memberId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {Promise<any>}
     */
     static getSumPriceComponentsByBike = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT EXTRACT(YEAR FROM components_changed.changed_at) AS label, SUM(components_changed.price) AS value
                                            FROM bikes_components, components_changed
                                            WHERE bikes_components.fk_bike = $1
                                            AND bikes_components.fk_component = components_changed.fk_component
                                            GROUP BY EXTRACT(YEAR FROM components_changed.changed_at)`,
                                            [bikeId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ComponentRepository;