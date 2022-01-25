const pool = require('../db/db');

class BikeRepository {

    /**
     * @param {int} memberId 
     * @param {String} name
     * @param {String} image 
     * @param {String} dateOfPurchase 
     * @param {int} nbKm 
     * @returns QueryResult<any>
     */
    static createBike = async (memberId, name, image, dateOfPurchase, nbKm) => {
        const client = await pool.connect();
        const res = await client.query(`INSERT INTO bike 
                                        (name, image, date_of_purchase, fk_member, nb_km) 
                                        VALUES ($1, $2, $3, $4, $5)`, 
        [name, image, dateOfPurchase, memberId, nbKm]);
        client.release(true);
        return res;
    }

    /**
     * @param {int} memberId 
     * @returns QueryResult<any>
     */
    static getBikes = async (memberId) => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM bike WHERE fk_member = $1', [memberId]);
        client.release(true);
        return res;
    }

    /**
     * @param {int} bikeId 
     * @returns QueryResult<any>
     */
    static deleteBike = async (bikeId) => {
        const client = await pool.connect();
        const res = await client.query('DELETE FROM bike WHERE bike_id = $1', [bikeId]);
        client.release(true);
        return res;
    }

    /**
     * @param {Bike} bike 
     * @returns QueryResult<any>
     */
    static updateBike = async (bike) => {
        const client = await pool.connect();
        const res = await client.query(`UPDATE bike 
                                    SET name = $1, 
                                    image = $2,
                                    nb_km = $3,
                                    date_of_purchase = $4
                                    WHERE bike_id = $5`,
                                    [bike.name, 
                                    bike.image, 
                                    bike.nbKm, 
                                    bike.dateOfPurchase, 
                                    bike.id]);
        client.release(true);
        return res;
    }

    /**
     * @param {int} bikeId
     * @param {double} toAdd
     * @returns QueryResult<any>
     */
     static updateBikeKm = async (bikeId, kmToAdd) => {
        const client = await pool.connect();
        const res = await client.query(`UPDATE bike 
                                    SET nb_km = nb_km + $1
                                    WHERE bike_id = $2`,
                                    [kmToAdd, bikeId]);
        client.release(true);
        return res;
    }
}

module.exports = BikeRepository;