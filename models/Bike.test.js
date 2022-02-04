const { createFromList } = require("./Bike");

const bikes = createFromList([{
    'bike_id': 'fs45fs5qfs5q4',
    'name': 'Vélo de test',
    'average_use_week': 4,
    'average_km_week': 45,
    'electric': true,
    'added_at': '2022-02-02'
}]);

test('Check values of bike', async () => {
    expect(bikes.length).toBe(1);
    expect(bikes[0].id).toBe('fs45fs5qfs5q4');
    expect(bikes[0].name).toBe('Vélo de test');
    expect(bikes[0].electric).toBe(true);
    expect(bikes[0].kmPerWeek).toBe(45);
    expect(bikes[0].nbUsedPerWeek).toBe(4);
    expect(bikes[0].addedAt).toBe('2022-02-02');
});