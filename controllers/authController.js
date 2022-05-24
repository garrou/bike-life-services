const { Router } = require('express');
const authService = require('../services/AuthService');
const router = Router();

router.post('/signup', authService.signup);

router.post('/login', authService.login);

router.get('/confirmation/:token', authService.confirmEmail);

router.post('/forgot', authService.forgotPassword);

router.get('/reset/:token', authService.resetPassword);

module.exports = router;