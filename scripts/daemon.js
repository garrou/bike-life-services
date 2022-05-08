require('dotenv').config();
const BikeRepository = require( "../repositories/BikeRepository");

(async () => {

    try {
        const bikes = await BikeRepository.getBikesWithAutoKm();

        console.log(`${bikes['rows'].length} bikes with automatic km`);

        for (const bike of bikes['rows']) {
            await BikeRepository.addKm(bike.bike_id, bike.average_km_week / 7);
        }
    } catch (err) {
        console.log(err);
    }
})();
