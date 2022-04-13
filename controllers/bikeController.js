const { Router } = require('express');
const bikeService = require('../services/BikeService');
const Guard = require('../middlewares/Guard');
const router = Router();

router.get('/bikes/:bikeId', Guard.checkToken, bikeService.get);

router.get('/member/bikes', Guard.checkToken, bikeService.getByMember);

router.post('/member/bikes', Guard.checkToken, bikeService.create);

router.delete('/bikes/:bikeId', Guard.checkToken, bikeService.delete);

router.put('/bikes/:bikeId', Guard.checkToken, bikeService.update);

router.patch('/bikes/:bikeId', Guard.checkToken, bikeService.addKm);

module.exports = router;