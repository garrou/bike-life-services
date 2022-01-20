const { Router } = require('express');
const bikeService = require('../services/bikeService');
const guard = require('../middlewares/guard');
const router = Router();

// GET /bikes?memberId=n
router.get('/bikes', guard.checkToken, bikeService.getMemberBikes);

// POST /bikes
router.post('/bikes', guard.checkToken, bikeService.addBike);

// DELETE /bikes/n
router.delete('/bikes/:bikeId', guard.checkToken, bikeService.deleteBike);

// PUT /bikes/n
router.put('/bikes/:bikeId', guard.checkToken, bikeService.update);

// PATCH /bikes/n
router.patch('/bikes/:bikeId', guard.checkToken, bikeService.addKm);

module.exports = router;