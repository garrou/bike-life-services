const pool = require('../db/db');

class BikeRepository {

    /**
     * @param {String} memberId
     * @param {Bike} bike
     */
    static create = async (memberId, bike) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO bikes (bike_id, name, electric, average_km_week, added_at, bike_type, total_km, automatic_km, price)
                                VALUES ($1, $2, $3, ROUND($4, 2), $5, $6, ROUND($7, 2), $8, ROUND($9, 2))`, 
                                [bike.id, bike.name, bike.electric, bike.kmPerWeek, bike.addedAt, bike.type, bike.totalKm, bike.automaticKm, bike.price]);
            await client.query(`INSERT INTO members_bikes (fk_member, fk_bike) VALUES ($1, $2)`, [memberId, bike.id]);
            client.release();
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} bikeId 
     * @returns {Promise<any>}
     */
    static get = async (bikeId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM bikes 
                                            WHERE bike_id = $1`, 
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
    static getByMember = async (memberId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT bikes.* 
                                            FROM bikes, members_bikes
                                            WHERE bike_id = fk_bike
                                            AND fk_member = $1
                                            ORDER BY total_km DESC`, 
                                            [memberId]);
            client.release();
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
            client.release();
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
                                SET name = $1, electric = $2, average_km_week = ROUND($3, 2), bike_type = $4, total_km = ROUND($5, 2), automatic_km = $6, price = ROUND($7, 2)
                                WHERE bike_id = $8`,
                                [bike.name, bike.electric, bike.kmPerWeek, bike.type, bike.totalKm, bike.automaticKm, bike.price, bike.id]);
            client.release();
        } catch (err) {
            throw err;
        }
   }

    /**
     * @returns {Promise<any>}
     */
    static getBikesWithAutoKm = async () => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT bike_id, average_km_week 
                                            FROM bikes
                                            WHERE automatic_km = true`);
            client.release();
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
                                SET total_km = ROUND(total_km + $1, 2)
                                WHERE bike_id = $2`,
                [km, bikeId]);
            await client.query(`UPDATE components
                                SET total_km = ROUND(total_km + $1, 2)
                                FROM bikes_components
                                WHERE bikes_components.fk_bike = $2
                                AND components.component_id = bikes_components.fk_component`,
                [km, bikeId])
            client.release();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BikeRepository;