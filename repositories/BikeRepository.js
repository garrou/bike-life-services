const pool = require('../db/db');

class BikeRepository {

    /**
     * @param {int} memberId 
     * @param {String} name
     * @param {String} image 
     * @param {Date} dateOfPurchase 
     * @param {int} nbKm 
     */
    static createBike = async (memberId, name, image, dateOfPurchase, nbKm) => {
        const client = await pool.connect();
        await client.query('insert into bike (name, image, date_of_purchase, fk_member, nb_km) values ($1, $2, $3, $4, $5)', 
        [name, image, dateOfPurchase, memberId, nbKm]);
        client.release(true);
    }

    /**
     * @param {int} memberId 
     * @returns QueryResult<any>
     */
    static getBikes = async (memberId) => {
        const client = await pool.connect();
        const res = await client.query('select * from bike where fk_member = $1', [memberId]);
        client.release(true);
        return res;
    }

    /**
     * @param {int} bikeId 
     */
    static deleteBike = async (bikeId) => {
        const client = await pool.connect();
        await client.query('delete from bike where bike_id = $1', [bikeId]);
        client.release(true);
    }

    /**
     * @param {Bike} bike 
     */
    static updateBike = async (bike) => {
        const client = await pool.connect();
        await client.query(`update bike 
                                    set name = $1, 
                                    image = $2,
                                    nb_km = $3,
                                    date_of_purchase = $4
                                    where bike_id = $5`,
                                    [bike.name, 
                                    bike.image, 
                                    bike.nbKm, 
                                    bike.dateOfPurchase, 
                                    bike.id]);
        client.release(true);
    }

    /**
     * @param {int} bikeId
     * @param {double} toAdd
     */
     static updateBikeKm = async (bikeId, kmToAdd) => {
        const client = await pool.connect();
        await client.query(`update bike 
                                    set nb_km = nb_km + $1
                                    where bike_id = $2`,
                                    [kmToAdd, bikeId]);
        client.release(true);
    }
}

module.exports = BikeRepository;