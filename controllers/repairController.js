const { Router } = require('express');
const repairService = require('../services/RepairService');
const Guard = require('../middlewares/Guard');

const router = Router();

router.post('/', Guard.checkToken, repairService.addRepair);

router.get('/:componentId', Guard.checkToken, repairService.getRepairs);

module.exports = router;