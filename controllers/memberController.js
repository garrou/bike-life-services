const { Router } = require('express');
const guard = require('../middlewares/guard');
const memberService = require('../services/memberService');
const router = Router();

router.get('/verify', guard.checkToken, memberService.verify);

router.post('/members', memberService.signup);

router.post('/login', memberService.login);

router.put('/members/:id', guard.checkToken, memberService.update);

module.exports = router;