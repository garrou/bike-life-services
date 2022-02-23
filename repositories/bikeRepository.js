const Bike = require('../models/Bike');
const pool = require('../db/db');

class BikeRepository {

    /**
     * @param {String} memberId
     * @param {Bike} bike
     * @returns {QueryResult<any>}
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
                                            AND fk_member = $1`, 
                                            [memberId]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {QueryResult<any>}
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
     * @returns {QueryResult<any>}
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
     * @returns {QueryResult<any>}
     */
    static addDailyKm = async (bikeId) => {
        try {
            const client = await pool.connect();
            await client.query(`UPDATE bikes
                                SET total_km = total_km + average_km_week / 7
                                WHERE bike_id = $1`,
                                [bikeId]);
            client.release(true);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BikeRepository;