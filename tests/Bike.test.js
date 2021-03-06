const { fromList, fromJson } = require("../models/Bike");

let bike, bikes;

beforeEach(() => {
    bikes = fromList([{
        'bike_id': '5f8988a0-b9b9-11ec-8bdb-d3c3457cc037',
        'name': 'vélo de test',
        'average_km_week': 700,
        'electric': true,
        'added_at': '2022-02-02',
        'bike_type': 'VTT',
        'total_km': '1786',
        'automatic_km': true,
        'price': '1254.54'
    }]);

    bike = fromJson({
        'id': '5f8988a0-b9b9-11ec-8bdb-d3c3457cc037',
        'name': 'test',
        'kmPerWeek': 123,
        'electric': false,
        'automaticKm': true,
        'type': 'Ville',
        'addedAt': '2022-02-02',
        'totalKm': '487',
        'price': '1000'
    });
});

test('Check values of bike', () => {
    expect(bikes.length).toBe(1);
    expect(bikes[0].id).toBe('5f8988a0-b9b9-11ec-8bdb-d3c3457cc037');
    expect(bikes[0].name).toBe('Vélo de test');
    expect(bikes[0].electric).toBe(true);
    expect(bikes[0].kmPerWeek).toBe(700);
    expect(bikes[0].addedAt).toBe('2022-02-02');
    expect(bikes[0].type).toBe('VTT');
    expect(bikes[0].totalKm).toBe(1786);
    expect(bikes[0].price).toBe(1254.54);
});

test('Check if is valid bike', () => {
    expect(bikes.length).toBe(1);
    expect(bikes[0].isValid()).toBe(true);
});

test('Check if is not a valid bike with string', () => {
    bike.kmPerWeek = 'invalid';
    expect(bike.isValid()).toBe(false);
});

test('Check if is not a valid bike with negative number', () => {
    bike.kmPerWeek = -125;
    expect(bike.isValid()).toBe(false);
});

test('Check if is not a valid bike with too big name', () => {
    bike.name = new Array(52).join('a');
    expect(bike.isValid()).toBe(false);
});

test('Check if price is valid with invalid price', () => {
    bike.price = -895;
    expect(bike.isValid()).toBe(false);
});

test('Check if Bike is created from json', () => {
    expect(bike.id).toBe('5f8988a0-b9b9-11ec-8bdb-d3c3457cc037');
    expect(bike.name).toBe('Test');
    expect(bike.electric).toBe(false);
    expect(bike.kmPerWeek).toBe(123);
    expect(bike.addedAt).toBe('2022-02-02');
    expect(bike.type).toBe('Ville');
    expect(bike.totalKm).toBe(487);
    expect(bike.price).toBe(1000);
});