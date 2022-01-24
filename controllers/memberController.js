const { Router } = require('express');
const guard = require('../middlewares/guard');
const memberService = require('../services/memberService');
const router = Router();

router.post('/members', memberService.signup);

router.post('/login', memberService.login);

router.put('/members/:id', guard.checkToken, memberService.update);

module.exports = router;