const client = require('../config/db');

class BikeRepository {

    /**
     * @param {int} memberId 
     * @param {String} name 
     * @param {String} description 
     * @param {String} image 
     * @param {Date} dateOfPurchase 
     * @param {int} nbKm 
     * @returns Promise<QueryResult<any>>
     */
    static createBike = async (memberId, name, description, image, dateOfPurchase, nbKm) => {
        return await client.query('insert into bike (name, description, image, date_of_purchase, fk_member, nb_km) values ($1, $2, $3, $4, $5, $6)', 
        [name, description, image, dateOfPurchase, memberId, nbKm]);
    }

    /**
     * @param {int} memberId 
     */
    static addAverageLifeDuration = async (memberId) => {
        await client.query(`call init_average_life_duration(${memberId})`);
    }

    /**
     * @param {int} memberId 
     * @returns Promise<QueryResult<any>>
     */
    static getBikes = async (memberId) => {
        return await client.query('select * from bike where fk_member = $1', [memberId]);
    }

    /**
     * @param {int} bikeId 
     * @returns Promise<QueryResult<any>>
     */
    static deleteBike = async (bikeId) => {
        return await client.query('delete from bike where bike_id = $1', [bikeId]);
    }

    /**
     * @param {Bike} bike 
     * @returns Promise<QueryResult<any>>
     */
    static updateBike = async (bike) => {
        return await client.query(`update bike set
                                    name = $1, 
                                    description = $2, 
                                    image = $3,
                                    nb_km = $4,
                                    date_of_purchase = $5
                                    where bike_id = $6`,
                                    [bike['name'], 
                                    bike['description'], 
                                    bike['image'], 
                                    bike['nbKm'], 
                                    bike['dateOfPurchase'], 
                                    bike['id']]);
    }

    static getBikeComponents = async (bikeId) => {
        return await client.query(`select * from get_all_bike_components(${bikeId})`);
    }
}

module.exports = BikeRepository;