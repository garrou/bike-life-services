const Bike = require('../models/Bike');
const pool = require('../db/db');

class BikeRepository {

    /**
     * @param {String} memberId
     * @param {Bike} bike
     */
    static create = async (memberId, bike) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO bikes
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
                                [bike.id, bike.name, bike.electric, bike.kmPerWeek, bike.addedAt, bike.type, bike.totalKm, bike.automaticKm]);
            await client.query(`INSERT INTO members_bikes VALUES ($1, $2)`, [memberId, bike.id]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {QueryResult<any>}
     */
    static get = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM bikes 
                                            WHERE bike_id = $1`, 
                                            [bikeId]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} memberId 
     * @returns {QueryResult<any>}
     */
    static getByMember = async (memberId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT bikes.* 
                                            FROM bikes, members_bikes
                                            WHERE bike_id = fk_bike
                                            AND fk_member = $1
                                            ORDER BY total_km DESC`, 
                                            [memberId]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     */
    static delete = async (bikeId) => {

        try {
            const client = await pool.connect();
            await client.query(`CALL delete_bike($1)`, [bikeId]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }
    
    /**
     * @param {Bike} bike 
     */
    static update = async (bike) => {

        try {
            const client = await pool.connect();
            await client.query(`UPDATE bikes 
                                SET name = $1, electric = $2, average_km_week = $3, bike_type = $4, total_km = $5, automatic_km = $6
                                WHERE bike_id = $7`,
                                [bike.name, bike.electric, bike.kmPerWeek, bike.type, bike.totalKm, bike.automaticKm, bike.id]);
            client.release(true);
        } catch (err) {
            throw err;
        }
   }

    /**
     * @returns {QueryResult<any>}
     */
    static getBikesWithAutoKm = async () => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT bike_id, average_km_week 
                                            FROM bikes
                                            WHERE automatic_km = true`);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @param {Number} km
     */
    static addKm = async (bikeId, km) => {

        try {
            const client = await pool.connect();
            await client.query(`UPDATE bikes
                                SET total_km = total_km + $1
                                WHERE bike_id = $2`,
                                [km, bikeId]);
            await client.query(`UPDATE components
                                SET total_km = total_km + $1
                                FROM bikes_components
                                WHERE bikes_components.fk_bike = $2
                                AND components.component_id = bikes_components.fk_component`,
                                [km, bikeId])
            client.release(true);
        } catch (err) {
            throw err;
        }
    }

    
    static addDailyKm = async () => {

        try {
            const client = await pool.connect();
            await client.query(`UPDATE bikes
                                SET total_km = ROUND(total_km + average_km_week / 7, 2)
                                WHERE automatic_km = TRUE`);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BikeRepository;