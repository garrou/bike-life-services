const { Router } = require('express');
const componentService = require('../services/componentService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/components', guard.checkToken, componentService.getBikeComponents);

router.post('/components', guard.checkToken, componentService.add);

router.put('/components/:componentId', guard.checkToken, componentService.update);

module.exports = router;