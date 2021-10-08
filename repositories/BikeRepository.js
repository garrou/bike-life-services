const client = require('../config/db');

class BikeRepository {

    static createBike = async (memberId, name, description, image) => {
        return await client.query('insert into (name, description, image, fk_member) values ($1, $2, $3, $4)', [name, description, image, memberId]);
    }
}

module.exports = BikeRepository;