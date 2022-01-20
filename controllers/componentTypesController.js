const { Router } = require('express');
const componentTypesService = require('../services/componentTypesService');
const guard = require('../middlewares/guard');
const router = Router();

// GET /component-types
router.get('/component-types', guard.checkToken, componentTypesService.getTypes);

module.exports = router;