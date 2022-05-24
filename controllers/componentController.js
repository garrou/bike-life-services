const { Router } = require('express');
const componentService = require('../services/ComponentService');
const Guard = require('../middlewares/Guard');

const router = Router();

router.patch('/:componentId', Guard.checkToken, componentService.changeComponent);

router.put('/:componentId', Guard.checkToken, componentService.updateComponent);

router.get('/:componentId/change-historic', Guard.checkToken, componentService.getChangeHistoricByComponent);

router.get('/nb-change-stats/years/:year', Guard.checkToken, componentService.getNumOfComponentChangeByMemberByYear);

router.get('/km-change-stats/years/:year', Guard.checkToken, componentService.getAvgKmComponentChangeByMemberByYear);

router.get('/nb-changes', Guard.checkToken, componentService.getTotalNbChangeByMember);

router.get('/percents', Guard.checkToken, componentService.getAvgPercentChangesByMember);

router.get('/price', Guard.checkToken, componentService.getSumPriceComponentByMember);

module.exports = router;