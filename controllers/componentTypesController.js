const { Router } = require('express');
const componentTypesService = require('../services/componentTypesService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/component-types', guard.checkToken, componentTypesService.getTypesNames);

module.exports = router;