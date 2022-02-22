const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/bikeRepository');
const Component = require('../models/Component');
const ComponentRepository = require('../repositories/ComponentRepository');
const cron = require('node-cron');

const everyDayAtMidnight = '0 0 0 * * *';

cron.schedule(everyDayAtMidnight, async () => {

    const dbBikes = (await BikeRepository.getBikesWithAutoKm()).rows;
    const bikes = Bike.fromList(dbBikes);    
    
    bikes.forEach(async (bike) => {
        await BikeRepository.addDailyKm(bike.id);
        const dbComponents = (await ComponentRepository.getBikeComponents(bike.id)).rows;
        const components = Component.fromList(dbComponents);

        components.forEach(async (component) => ComponentRepository.addDailyKm(component.id, bike.kmPerWeek / 7));
    });
});

module.exports = cron;

