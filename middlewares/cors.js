const cors = require('cors');

const corsOptions = {
    origin: process.env.ORIGIN
}

module.exports = cors(corsOptions);