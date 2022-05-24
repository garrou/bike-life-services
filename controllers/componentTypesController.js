const { Router } = require('express');
const componentTypesService = require('../services/ComponentTypesService');
const Guard = require('../middlewares/Guard');

const router = Router();

router.get('/', Guard.checkToken, componentTypesService.get);

module.exports = router;