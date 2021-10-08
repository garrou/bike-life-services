const authService = require('../services/authService');
const accountService = require('../services/accountService');
const guard = require('../middlewares/guard');
const { Router } = require('express');
const router = Router();

router.post('/members', authService.signup);
router.post('/login', authService.login);

router.get('/bikes', guard.checkToken, accountService.getBikes);
router.post('/bikes', guard.checkToken, accountService.addBike);

module.exports = router;