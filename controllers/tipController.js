const { Router } = require('express');
const tipService = require('../services/TipService');
const Guard = require('../middlewares/Guard');
const router = Router();

router.get('/tips', Guard.checkToken, tipService.getAll);

router.get('/tips/:tipId', Guard.checkToken, tipService.getTip);

router.get('/topics/:topic/tips', Guard.checkToken, tipService.getByTopic);

router.get('/topics', Guard.checkToken, tipService.getTopics);

module.exports = router;