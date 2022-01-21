const pool = require('../db/db');

class ComponentTypesRepository {

    /**
     * @returns QueryResult<any>
     */
    static getTypes = async () => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM components_type');
        client.release(true);
        return res;
    }
}

module.exports = ComponentTypesRepository;