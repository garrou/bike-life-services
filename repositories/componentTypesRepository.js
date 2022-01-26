const pool = require('../db/db');

class ComponentTypesRepository {

    /**
     * @returns QueryResult<any>
     */
    static getTypesNames = async () => {
        const client = await pool.connect();
        const res = await client.query('SELECT name FROM components_type ORDER BY name');
        client.release(true);
        return res;
    }
}

module.exports = ComponentTypesRepository;