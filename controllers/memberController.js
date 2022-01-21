const { Router } = require('express');
const guard = require('../middlewares/guard');
const memberService = require('../services/memberService');
const router = Router();

// POST /members
router.post('/members', memberService.signup);

// POST /login
router.post('/login', memberService.login);

// PUT /members/n
router.put('/members/:id', guard.checkToken, memberService.update);

module.exports = router;