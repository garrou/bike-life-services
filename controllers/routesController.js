const authService = require('../services/authService');
const accountService = require('../services/accountService');
const guard = require('../middlewares/guard');

const { Router } = require('express');
const router = Router();

router.post('/signup', authService.signup);
router.post('/login', authService.login);

router.get('/my-bikes', guard.authToken, accountService.getMyBikes);

module.exports = router;