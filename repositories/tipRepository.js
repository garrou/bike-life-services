const pool = require('../db/db');

class TipRepository {

    static getAll = async () => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM tips ORDER BY write_date DESC');
        client.release(true);
        return res;
    }
}

module.exports = TipRepository;