const client = require('../config/db');

class BikeRepository {

    /**
     * @param {int} memberId 
     * @param {String} name 
     * @param {String} description 
     * @param {String} image 
     * @returns Promise<QueryResult<any>>
     */
    static createBike = async (memberId, name, description, image) => {
        return await client.query('insert into bike (name, description, image, fk_member) values ($1, $2, $3, $4)', [name, description, image, memberId]);
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
}

module.exports = BikeRepository;