const pool = require('../db/db');

class ComponentTypeRepository {

    /**
     * @returns {QueryResult<any>}
     */
    static getAll = async () => {
    
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM components_type 
                                            ORDER BY name`);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @returns {QueryResult<any>}
     */
    static getAllWithoutBattery = async () => {
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM components_type
                                            WHERE name <> 'Batterie' 
                                            ORDER BY name`);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ComponentTypeRepository;