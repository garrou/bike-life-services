require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const authController = require('./controllers/authController');
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

app.use(authController);
app.use('/bikes', bikeController);
app.use('/components', componentController);
app.use('/component-types', componentTypesController);
app.use('/diagnostics', diagnosticController);
app.use('/member', memberController);
app.use('/repairs', repairController);
app.use('/tips', tipController);

app.listen(process.env.PORT, '::');