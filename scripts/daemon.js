require('dotenv').config();

const { Client } = require('pg');
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

(async () => {

    try {
        await client.connect();
        await client.query(`UPDATE bikes
                            SET total_km = ROUND(total_km + average_km_week / 7, 2)
                            WHERE automatic_km = TRUE`);
        client.end();
    } catch (err) {
        console.log(err);
    }
})();
