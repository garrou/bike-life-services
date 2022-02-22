const { Router } = require('express');
const tipService = require('../services/TipService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/tips', guard.checkToken, tipService.getAll);

router.get('/tips/:tipId', guard.checkToken, tipService.getTip);

router.get('/topics/:topic/tips', guard.checkToken, tipService.getByTopic);

module.exports = router;