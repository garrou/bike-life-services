const { createFromList } = require("./Bike");

const bikes = createFromList([{
    'bike_id': 'fs45fs5qfs5q4',
    'name': 'Vélo de test',
    'image': 'monimage',
    'nb_km': 45.25,
    'date_of_purchase': '2022-01-25',
    'electric': true
}]);

test('Check values of bike', async () => {
    expect(bikes.length).toBe(1);
    expect(bikes[0].id).toBe('fs45fs5qfs5q4');
    expect(bikes[0].name).toBe('Vélo de test');
    expect(bikes[0].image).toBe('monimage');
    expect(bikes[0].nbKm).toBe(45.25);
    expect(bikes[0].dateOfPurchase).toBe('2022-01-25');
    expect(bikes[0].electric).toBe(true);
});