const { Router } = require('express');
const componentService = require('../services/ComponentService');
const Guard = require('../middlewares/Guard');
const router = Router();

router.get('/bikes/:bikeId/components', Guard.checkToken, componentService.getBikeComponents);

router.get('/members/:memberId/components/nb-alerts', Guard.checkToken, componentService.getNbAlerts);

router.patch('/components/:componentId', Guard.checkToken, componentService.changeComponent);

router.get('/components/:componentId/change-historic', Guard.checkToken, componentService.getChangeHistoric);

router.get('/members/:memberId/components/nb-change-stats/years/:year', Guard.checkToken, componentService.getNumOfComponentChangeByMemberByYear);

router.get('/members/:memberId/components/km-change-stats/years/:year', Guard.checkToken, componentService.getAvgKmComponentChangeByMemberByYear);

router.get('/members/:memberId/components/nb-changes', Guard.checkToken, componentService.getTotalNbChange);

router.get('/members/:memberId/components/percents', Guard.checkToken, componentService.getAvgPercentChanges);

module.exports = router;