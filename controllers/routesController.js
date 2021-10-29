const memberService = require('../services/memberService');
const bikeService = require('../services/bikeService');
const guard = require('../middlewares/guard');
const { Router } = require('express');
const router = Router();

router.post('/members', memberService.signup);
router.post('/login', memberService.login);
router.get('/member/:email', guard.checkToken, memberService.getMember)

router.get('/bikes', guard.checkToken, bikeService.getBikes);
router.post('/bikes', guard.checkToken, bikeService.addBike);
router.delete('/bikes/:bikeId', guard.checkToken, bikeService.deleteBike);
router.put('/bikes/:bikeId', guard.checkToken, bikeService.updateBike);

router.get('/components/:bikeId', guard.checkToken, bikeService.getBikeComponents);
router.put('/components/:componentId', guard.checkToken, bikeService.updateComponent);

module.exports = router;