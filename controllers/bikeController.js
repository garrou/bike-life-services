const { Router } = require('express');
const bikeService = require('../services/bikeService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/bikes/:bikeId', guard.checkToken, bikeService.get);

router.get('/members/:memberId/bikes', guard.checkToken, bikeService.getByMember);

router.post('/members/:memberId/bikes', guard.checkToken, bikeService.create);

router.delete('/bikes/:bikeId', guard.checkToken, bikeService.delete);

router.put('/bikes/:bikeId', guard.checkToken, bikeService.update);

module.exports = router;