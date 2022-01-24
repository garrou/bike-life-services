const express = require('express');
const bikeController = require('./controllers/bikeController');
const componentController = require('./controllers/componentController');
const componentTypesController = require('./controllers/componentTypesController');
const memberController = require('./controllers/memberController');
const tipController = require('./controllers/tipController');
const { cors } = require('./middlewares/cors');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use(cors);

app.use(bikeController);
app.use(componentController);
app.use(componentTypesController);
app.use(memberController);
app.use(tipController);

app.listen(process.env.SERVER_PORT || 8100, '::');