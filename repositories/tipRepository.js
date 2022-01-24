const pool = require('../db/db');

class TipRepository {

    static getAll = async () => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM tips ORDER BY write_date DESC');
        client.release(true);
        return res;
    }

    static getById = async (tipId) => {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM tips WHERE tip_id = $1', [tipId]);
        client.release(true);
        return res;
    }
}

module.exports = TipRepository;