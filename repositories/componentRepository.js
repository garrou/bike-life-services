const pool = require('../db/db');

class ComponentRepository {
    
    /**
     * @param {int} bikeId 
     * @returns QueryResult<any>
     */
     static getBikeComponents = async (bikeId) => {
        const client = await pool.connect();
        const res = await client.query(`select * from components where bike_id = $1`, [bikeId]);
        client.release(true);
        return res;
    }

    /**
     * @param {Component} component 
     */
    static updateComponent = async (component) => {
        const client = await pool.connect();
        await client.query(`update components
                                set ${component.brand} = $1,
                                ${component.dateOfPurchase} = $2,
                                ${component.km} = $3,
                                ${component.duration} = $4,
                                ${component.image} = $5,
                                ${component.type} = $6
                                where component_id = $7`,
                                [component.brand, 
                                component.dateOfPurchase, 
                                component.km, 
                                component.duration,
                                component.image,
                                component.type,
                                component.id]);
        client.release(true);
    }
}

module.exports = ComponentRepository;