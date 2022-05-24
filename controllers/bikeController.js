const { Router } = require('express');
const bikeService = require('../services/BikeService');
const componentService = require("../services/ComponentService");
const Guard = require('../middlewares/Guard');

const router = Router();

router.get('/:bikeId', Guard.checkToken, bikeService.get);

router.get('/', Guard.checkToken, bikeService.getByMember);

router.post('/', Guard.checkToken, bikeService.create);

router.delete('/:bikeId', Guard.checkToken, bikeService.delete);

router.put('/:bikeId', Guard.checkToken, bikeService.update);

router.patch('/:bikeId', Guard.checkToken, bikeService.addKm);

router.get('/:bikeId/components', Guard.checkToken, componentService.getBikeComponents);

router.get('/:bikeId/components/nb-alerts', Guard.checkToken, componentService.getNbAlerts);

router.get('/:bikeId/components/price', Guard.checkToken, componentService.getSumPriceComponentsByBike);

router.get('/:bikeId/components/nb-change-stats', Guard.checkToken, componentService.getNbChangeByBike);

router.get('/:bikeId/components/percents', Guard.checkToken, componentService.getAvgPercentChangesByBike);

router.get('/:bikeId/components/nb-change-stats', Guard.checkToken, componentService.getNumOfComponentChangedByBike);

module.exports = router;