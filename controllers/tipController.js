const { Router } = require('express');
const tipService = require('../services/tipService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/tips', guard.checkToken, tipService.getAll);

router.get('/tips/:tipId', guard.checkToken, tipService.getTip);

router.get('/tips/types/:componentType', guard.checkToken, tipService.getByType);

module.exports = router;