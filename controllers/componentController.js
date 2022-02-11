const { Router } = require('express');
const componentService = require('../services/componentService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/bikes/:bikeId/components', guard.checkToken, componentService.getBikeComponents);

router.get('/members/:memberId/components/alerts', guard.checkToken, componentService.getAlerts);

router.patch('/components/:componentId', guard.checkToken, componentService.changeComponent);

router.get('/components/:componentId/change-historic', guard.checkToken, componentService.getChangeHistoric);

router.get('/members/:memberId/components/change-stats/years/:year', guard.checkToken, componentService.numberOfComponentChangeByMember);

module.exports = router;