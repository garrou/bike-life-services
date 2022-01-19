const express = require('express');
const router = require('./controllers/routesController');
const { cors } = require('./middlewares/cors');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(cors);
app.use(router);

app.listen(process.env.SERVER_PORT || 8100, '::');