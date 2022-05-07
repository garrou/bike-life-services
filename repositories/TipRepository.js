const pool = require('../db/db');

class TipRepository {

    /**
     * @returns {Promise<any>}
     */
    static getAll = async () => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM tips
                                            ORDER BY tip_id`);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {Number} tipId 
     * @returns {Promise<any>}
     */
    static getById = async (tipId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM tips 
                                            WHERE tip_id = $1`, [tipId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} topic 
     * @returns {Promise<any>}
     */
    static getByTopic = async (topic) => {
        
        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM tips 
                                            WHERE fk_topic LIKE $1
                                            OR (fk_topic IS NULL AND $1 = '%')`, 
                                            [topic]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} ids Ex: n,n,n
     * @return {Promise<any>}
     */
    static getBySeveralId = async (ids) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM tips
                                            WHERE fk_topic IN (
                                                SELECT DISTINCT component
                                                FROM diagnostic
                                                WHERE id in (${ids})
                                            )`);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

    static getTopics = async () => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT * 
                                            FROM topics
                                            ORDER BY name DESC`);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = TipRepository;
