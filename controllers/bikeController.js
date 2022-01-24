const { Router } = require('express');
const bikeService = require('../services/bikeService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/members/:memberId/bikes', guard.checkToken, bikeService.getMemberBikes);

router.post('/:memberId/bikes', guard.checkToken, bikeService.addBike);

router.delete('/bikes/:bikeId', guard.checkToken, bikeService.deleteBike);

router.put('/bikes/:bikeId', guard.checkToken, bikeService.update);

router.patch('/bikes/:bikeId', guard.checkToken, bikeService.addKm);

module.exports = router;