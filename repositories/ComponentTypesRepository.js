const pool = require('../db/db');

class ComponentTypeRepository {

    /**
     * @returns {Promise<any>}
     */
    static getAll = async () => {
    
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM components_type 
                                            ORDER BY name`);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @returns {Promise<any>}
     */
    static getAllWithoutBattery = async () => {
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM components_type
                                            WHERE name <> 'Batterie' 
                                            ORDER BY name`);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ComponentTypeRepository;