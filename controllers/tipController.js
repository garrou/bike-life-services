const { Router } = require('express');
const tipService = require('../services/TipService');
const Guard = require('../middlewares/Guard');

const router = Router();

router.get('/', Guard.checkToken, tipService.getAll);

router.get('/topics', Guard.checkToken, tipService.getTopics);

router.get('/topics/:topic', Guard.checkToken, tipService.getByTopic);

module.exports = router;