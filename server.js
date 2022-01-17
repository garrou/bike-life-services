const express = require('express');
const router = require('./controllers/routesController');
const { cors } = require('./middlewares/cors');
const app = express();

app.use(express.json());

app.use(cors);
app.use(router);

app.listen(8100, '::');