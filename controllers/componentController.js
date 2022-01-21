const { Router } = require('express');
const componentService = require('../services/componentService');
const guard = require('../middlewares/guard');
const router = Router();

// GET /components?bikeId=n
router.get('/components', guard.checkToken, componentService.getBikeComponents);

// POST /components
router.post('/components', guard.checkToken, componentService.add);

// PUT /components/n
router.put('/components/:componentId', guard.checkToken, componentService.update);

module.exports = router;