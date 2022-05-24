const { Router } = require('express');
const Guard = require('../middlewares/Guard');
const memberService = require('../services/MemberService');
const router = Router();

router.patch('/email', Guard.checkToken, memberService.updateEmail);

router.patch('/password', Guard.checkToken, memberService.updatePassword);

router.get('/email', Guard.checkToken, memberService.getEmail);

module.exports = router;