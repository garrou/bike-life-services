const Bike = require('../models/Bike');
const BikeRepository = require('../repositories/BikeRepository');
const cron = require('node-cron');

const everyDay = '5 0 0 * * *';

module.exports = cron.schedule(everyDay, async () => {

    try {
        await BikeRepository.addDailyKm();
    } catch (err) {
        console.log(err);
    }
});