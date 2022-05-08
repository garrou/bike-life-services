require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const bikeController = require('./controllers/bikeController');
const componentController = require('./controllers/componentController');
const componentTypesController = require('./controllers/componentTypesController');
const diagnosticController = require('./controllers/diagnosticController');
const memberController = require('./controllers/memberController');
const repairController = require('./controllers/repairController');
const tipController = require('./controllers/tipController');

const cors = require('./middlewares/cors');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors);

app.use(bikeController);
app.use(componentController);
app.use(componentTypesController);
app.use(diagnosticController);
app.use(memberController);
app.use(repairController);
app.use(tipController);

app.listen(process.env.PORT, '::');