const { Router } = require('express');
const Guard = require('../middlewares/Guard');
const memberService = require('../services/MemberService');
const router = Router();

router.post('/members/signup', memberService.signup);

router.post('/members/login', memberService.login);

router.get('/confirmation/:token', memberService.confirmEmail);

router.patch('/member/email', Guard.checkToken, memberService.updateEmail);

router.patch('/member/password', Guard.checkToken, memberService.updatePassword);

router.get('/member/email', Guard.checkToken, memberService.getEmail);

module.exports = router;