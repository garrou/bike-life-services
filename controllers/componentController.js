const { Router } = require('express');
const componentService = require('../services/ComponentService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/bikes/:bikeId/components', guard.checkToken, componentService.getBikeComponents);

router.get('/members/:memberId/components/alerts', guard.checkToken, componentService.getAlerts);

router.patch('/components/:componentId', guard.checkToken, componentService.changeComponent);

router.get('/components/:componentId/change-historic', guard.checkToken, componentService.getChangeHistoric);

router.get('/members/:memberId/components/nb-change-stats/years/:year', guard.checkToken, componentService.getNumOfComponentChangeByMemberByYear);

router.get('/members/:memberId/components/km-change-stats/years/:year', guard.checkToken, componentService.getAvgKmComponentChangeByMemberByYear);

router.get('/members/:memberId/components/nb-changes', guard.checkToken, componentService.getTotalNbChange);

router.get('/members/:memberId/components/percents', guard.checkToken, componentService.getAvgPercentChanges);

module.exports = router;