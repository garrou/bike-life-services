const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const cron = require('node-cron');

const everyDay = '8 0 0 * * *';

module.exports = cron.schedule(everyDay, async () => {

    const resp = (await BikeRepository.getBikesWithAutoKm()).rows;
    const bikes = Bike.fromList(resp);   
    
    bikes.forEach(async (bike) => {
        try {
            await BikeRepository.addKm(bike.id, (bike.kmPerWeek / 7).toFixed(2));
            console.log(`Add ${(bike.kmPerWeek / 7).toFixed(2)} km to ${bike.id}`);
        } catch (err) {
            console.log(`Error when add auto km : ${err}`);
        }
    });
});