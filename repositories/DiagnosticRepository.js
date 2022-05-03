const pool = require('../db/db');

class DiagnosticRepository {

    /**
     * @param {String} type
     * @returns {Promise<any>}
     */
    static getByBikeType = async (type) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT *
                                            FROM diagnostic
                                            WHERE bike_type IS NULL OR bike_type = $1
                                            ORDER BY id`,
                                            [type]);
            client.release(true);
            return res;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = DiagnosticRepository;