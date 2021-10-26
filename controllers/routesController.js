const authService = require('../services/authService');
const accountService = require('../services/accountService');
const guard = require('../middlewares/guard');
const { Router } = require('express');
const router = Router();

router.post('/members', authService.signup);
router.post('/login', authService.login);

router.get('/bikes', guard.checkToken, accountService.getBikes);
router.post('/bikes', guard.checkToken, accountService.addBike);
router.delete('/bikes/:bikeId', guard.checkToken, accountService.deleteBike);
router.put('/bikes/:bikeId', guard.checkToken, accountService.updateBike);

router.get('/components/:bikeId', accountService.getBikeComponents);

module.exports = router;