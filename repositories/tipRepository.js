const pool = require('../db/db');

class TipRepository {

    /**
     * @returns {QueryResult<any>}
     */
    static getAll = async () => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM tips 
                                            ORDER BY write_date DESC`);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {Number} tipId 
     * @returns {QueryResult<any>}
     */
    static getById = async (tipId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                    FROM tips 
                                    WHERE tip_id = $1`, [tipId]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} topic 
     * @returns {QueryResult<any>}
     */
    static getByTopic = async (topic) => {
        
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                    FROM tips 
                                    WHERE fk_topic LIKE $1`, [topic]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = TipRepository;
