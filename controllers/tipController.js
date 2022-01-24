const { Router } = require('express');
const tipService = require('../services/tipService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/tips', guard.checkToken, tipService.getAll);

router.get('/tips/:tipId', guard.checkToken, tipService.getTip);

module.exports = router;