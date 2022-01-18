const client = require('../db/db');

class BikeRepository {

    /**
     * @param {int} memberId 
     * @param {String} name
     * @param {String} image 
     * @param {Date} dateOfPurchase 
     * @param {int} nbKm 
     * @returns Promise<QueryResult<any>>
     */
    static createBike = async (memberId, name, image, dateOfPurchase, nbKm) => {
        return await client.query('insert into bike (name, image, date_of_purchase, fk_member, nb_km) values ($1, $2, $3, $4, $5)', 
        [name, image, dateOfPurchase, memberId, nbKm]);
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
        await client.query(`call add_km_to_components(${bike.id}, ${bike.nbKm})`);
        return await client.query(`update bike 
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
    }

    /**
     * @param {int} bikeId
     * @param {double} toAdd
     * @returns Promise<QueryResult<any>>
     */
     static updateBikeKm = async (bikeId, kmToAdd) => {
        await client.query(`call add_km_to_components(${bikeId}, ${kmToAdd})`);
        return await client.query(`update bike 
                                    set nb_km = nb_km + $1
                                    where bike_id = $2`,
                                    [kmToAdd, bikeId]);
    }

    static getBikeComponents = async (bikeId) => {
        return await client.query(`select * from get_all_bike_components(${bikeId})`);
    }

    static updateComponent = async (component) => {
        return await client.query(`update ${component.detail}
                                    set ${component.detail}_brand = $1,
                                    ${component.detail}_km = $2,
                                    ${component.detail}_duration = $3`,
                                    [component.brand, component.km, component.duration]);
    }
}

module.exports = BikeRepository;