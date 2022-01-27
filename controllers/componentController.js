const { Router } = require('express');
const componentService = require('../services/componentService');
const guard = require('../middlewares/guard');
const router = Router();

router.get('/members/:memberId/components', guard.checkToken, componentService.getArchivedMemberComponents);

router.get('/bikes/:bikeId/components', guard.checkToken, componentService.getBikeComponents);

router.post('/bikes/:bikeId/components', guard.checkToken, componentService.add);

router.post('/bikes/:bikeId/components/init', guard.checkToken, componentService.initComponents);

router.put('/components/:componentId', guard.checkToken, componentService.update);

module.exports = router;