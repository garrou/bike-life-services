const Bike = require('../models/Bike');
const Component = require('../models/Component');
const bikeRepository = require('../repositories/bikeRepository');
const componentRepository = require('../repositories/componentRepository');
const cron = require('node-cron');

const everyDayAtMidnight = '0 0 0 * * *';
const everyMinute = '* * * * *';

cron.schedule(everyMinute, async () => {

    const dbBikes = (await bikeRepository.getBikesAutoKm()).rows;
    const bikes = Bike.fromList(dbBikes);    
    
    bikes.forEach(async (bike) => {
        await bikeRepository.addDailyKm(bike.id);
        const dbComponents = (await componentRepository.getBikeComponents(bike.id)).rows;
        const components = Component.fromList(dbComponents);

        components.forEach(async (component) => componentRepository.addDailyKm(component.id, bike.kmPerWeek / 7));
    });
});

module.exports = cron;