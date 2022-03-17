const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const cron = require('node-cron');

const everyDayAtMidnight = '0 0 0 * * *';

cron.schedule(everyDayAtMidnight, async () => {

    const resp = (await BikeRepository.getBikesWithAutoKm()).rows;
    const bikes = Bike.fromList(resp);    
    
    bikes.forEach(async (bike) => await BikeRepository.addKm(bike.id, bike.kmPerWeek / 7));
});

module.exports = cron;

