const { Router } = require('express');
const repairService = require('../services/RepairService');
const Guard = require('../middlewares/Guard');
const router = Router();

router.post('/components/repairs', Guard.checkToken, repairService.addRepair);

router.get('/components/:componentId/repairs', Guard.checkToken, repairService.getRepairs);

module.exports = router;