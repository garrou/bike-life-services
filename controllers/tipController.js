const { Router } = require('express');
const tipService = require('../services/tipService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/tips', guard.checkToken, tipService.getAll);

module.exports = router;