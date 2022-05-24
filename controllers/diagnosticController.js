const { Router } = require('express');
const Guard = require('../middlewares/Guard');
const diagnosticService = require('../services/DiagnosticService');

const router = Router();

router.get('/:type', Guard.checkToken, diagnosticService.getDiagnostics);

router.post('/check', Guard.checkToken, diagnosticService.checkDiagnostics);

module.exports = router;