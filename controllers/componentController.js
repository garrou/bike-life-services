const { Router } = require('express');
const componentService = require('../services/componentService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/bikes/:bikeId/components', guard.checkToken, componentService.getBikeComponents);

router.get('/members/:memberId/components/alerts', guard.checkToken, componentService.getAlerts);

module.exports = router;