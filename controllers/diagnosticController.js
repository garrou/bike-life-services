const { Router } = require('express');
const Guard = require('../middlewares/Guard');
const diagnosticService = require('../services/DiagnosticService');
const router = Router();

router.get('/diagnostics/:type', Guard.checkToken, diagnosticService.getDiagnostics);

module.exports = router;