const { Router } = require('express');
const componentService = require('../services/componentService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/bikes/:bikeId/components', guard.checkToken, componentService.getBikeComponents);

router.post('/bikes/:bikeId/components', guard.checkToken, componentService.create);

router.put('/components/:componentId', guard.checkToken, componentService.update);

module.exports = router;