const { Router } = require('express');
const bikeService = require('../services/bikeService');
const componentService = require('../services/componentService');
const componentTypesService = require('../services/componentTypesService');
const guard = require('../middlewares/guard');
const memberService = require('../services/memberService');
const router = Router();

// POST /members
router.post('/members', memberService.signup);

// POST /login
router.post('/login', memberService.login);

// PUT /members/n
router.put('/members/:id', guard.checkToken, memberService.update);

// GET /members/n
router.get('/members/:id', guard.checkToken, memberService.getMemberById);

// GET /bikes?memberId=n
router.get('/bikes', guard.checkToken, bikeService.getMemberBikes);

// POST /bikes
router.post('/bikes', guard.checkToken, bikeService.addBike);

// DELETE /bikes/n
router.delete('/bikes/:bikeId', guard.checkToken, bikeService.deleteBike);

// PUT /bikes/n
router.put('/bikes/:bikeId', guard.checkToken, bikeService.update);

// PATCH /bikes/n
router.patch('/bikes/:bikeId', guard.checkToken, bikeService.addKm);

// GET /components?bikeId=n
router.get('/components', guard.checkToken, componentService.getBikeComponents);

// POST /components
router.post('/components', guard.checkToken, componentService.add);

// PUT /components/n
router.put('/components/:componentId', guard.checkToken, componentService.update);

// GET /component-types
router.get('/component-types', guard.checkToken, componentTypesService.getTypes);

module.exports = router;