const pool = require('../db/db');

class RepairRepository {

    /**
     * @param {Repair} repair
     * @returns {Promise<void>}
     */
    static create = async (repair) => {

        try {
            const client = await pool.connect();
            await client.query(`INSERT INTO repairs (repair_at, reason, price, fk_component)
                                VALUES ($1, $2, $3, $4)`,
                                [repair.repairAt, repair.reason, repair.price, repair.componentId]);
            client.release();
        } catch (err) {
            throw err;
        }
    }


    /**
     * @param {String} componentId
     * @returns {Promise<any>}
     */
    static getByComponent = async (componentId) => {

        try {
            const client = await pool.connect();
            const res = await client.query(`SELECT *
                                            FROM repairs
                                            WHERE fk_component = $1
                                            ORDER BY repair_at DESC`,
                                            [componentId]);
            client.release();
            return res;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = RepairRepository;