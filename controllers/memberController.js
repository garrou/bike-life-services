const { Router } = require('express');
const guard = require('../middlewares/guard');
const memberService = require('../services/memberService');
const router = Router();

router.post('/members/signup', memberService.signup);

router.post('/members/login', memberService.login);

router.patch('/members/:id/email', guard.checkToken, memberService.updateEmail);

router.patch('/members/:id/password', guard.checkToken, memberService.updatePassword);

router.get('/members/:id/email', guard.checkToken, memberService.getEmail);

module.exports = router;