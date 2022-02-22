const { Router } = require('express');
const componentTypesService = require('../services/ComponentTypesService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/component-types', guard.checkToken, componentTypesService.get);

module.exports = router;