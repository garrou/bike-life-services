const { Client } = require('pg');
const config = require('../config/config.json');

const client = new Client({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port
});

client.connect()
        .then(() => console.log('Connected to database'))
        .catch(e => console.log(e));

module.exports = client;