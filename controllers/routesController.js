const { Router } = require('express');
const bikeService = require('../services/bikeService');
const componentService = require('../services/componentService');
const componentTypesService = require('../services/componentTypesService');
const guard = require('../middlewares/guard');
const memberService = require('../services/memberService');
const router = Router();

router.post('/members', memberService.signup);
router.post('/login', memberService.login);

router.put('/members/:id', guard.checkToken, memberService.updateMember);
router.get('/members/:id', guard.checkToken, memberService.getMemberById);

// GET /bikes?memberId=n
router.get('/bikes', guard.checkToken, bikeService.getBikes);

// POST /bikes
router.post('/bikes', guard.checkToken, bikeService.addBike);

// DELETE /bikes/n
router.delete('/bikes/:bikeId', guard.checkToken, bikeService.deleteBike);

// PUT /bikes/n
router.put('/bikes/:bikeId', guard.checkToken, bikeService.updateBike);

// PATCH /bikes/n
router.patch('/bikes/:bikeId', guard.checkToken, bikeService.updateBikeKm);

// GET /components?bikeId=n
router.get('/components', guard.checkToken, componentService.getBikeComponents);

// PUT /components/n
router.put('/components/:componentId', guard.checkToken, componentService.updateComponent);

// GET /component-types
router.get('/component-types', guard.checkToken, componentTypesService.getTypes);

module.exports = router;