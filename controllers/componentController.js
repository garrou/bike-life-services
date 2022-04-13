const { Router } = require('express');
const componentService = require('../services/ComponentService');
const Guard = require('../middlewares/Guard');
const router = Router();

router.get('/bikes/:bikeId/components', Guard.checkToken, componentService.getBikeComponents);

router.get('/bikes/:bikeId/components/nb-alerts', Guard.checkToken, componentService.getNbAlerts);

router.patch('/components/:componentId', Guard.checkToken, componentService.changeComponent);

router.put('/components/:componentId', Guard.checkToken, componentService.updateComponent);

router.get('/components/:componentId/change-historic', Guard.checkToken, componentService.getChangeHistoricByComponent);

router.get('/components/nb-change-stats/years/:year', Guard.checkToken, componentService.getNumOfComponentChangeByMemberByYear);

router.get('/components/km-change-stats/years/:year', Guard.checkToken, componentService.getAvgKmComponentChangeByMemberByYear);

router.get('/components/nb-changes', Guard.checkToken, componentService.getTotalNbChangeByMember);

router.get('/components/percents', Guard.checkToken, componentService.getAvgPercentChangesByMember);

router.get('/bikes/:bikeId/components/nb-change-stats', Guard.checkToken, componentService.getNbChangeByBike);

router.get('/bikes/:bikeId/components/percents', Guard.checkToken, componentService.getAvgPercentChangesByBike);

router.get('/bikes/:bikeId/components/nb-change-stats', Guard.checkToken, componentService.getNumOfComponentChangedByBike);

router.get('/components/price', Guard.checkToken, componentService.getSumPriceComponentByMember);

router.get('/bikes/:bikeId/components/price', Guard.checkToken, componentService.getSumPriceComponentsByBike);

module.exports = router;