const { Router } = require('express');
const Guard = require('../middlewares/Guard');
const memberService = require('../services/MemberService');
const router = Router();

router.post('/members/signup', memberService.signup);

router.post('/members/login', memberService.login);

router.patch('/members/:id/email', Guard.checkToken, memberService.updateEmail);

router.patch('/members/:id/password', Guard.checkToken, memberService.updatePassword);

router.get('/members/:id/email', Guard.checkToken, memberService.getEmail);

module.exports = router;