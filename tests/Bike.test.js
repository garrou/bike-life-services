const { fromList, fromJson } = require("../models/Bike");

let bike, bikes;

beforeEach(() => {
    bikes = fromList([{
        'bike_id': 'fs45fs5qfs5q4',
        'name': 'Vélo de test',
        'average_km_week': 700,
        'electric': true,
        'buyAt': '2021-02-01',
        'added_at': '2022-02-02',
        'bike_type': 'VTT',
        'total_km': '1786',
        'automatic_km': true
    }]);

    bike = fromJson({
        'id': 'eeefzfz', 
        'name': 'test', 
        'kmPerWeek': 123, 
        'electric': false, 
        'automaticKm': true,
        'type': 'Ville', 
        'buyAt': '2021-02-01',
        'addedAt': '2022-09-02',
        'totalKm': '487'
    });
})

test('Check values of bike', () => {
    expect(bikes.length).toBe(1);
    expect(bikes[0].id).toBe('fs45fs5qfs5q4');
    expect(bikes[0].name).toBe('Vélo de test');
    expect(bikes[0].electric).toBe(true);
    expect(bikes[0].kmPerWeek).toBe(700);
    expect(bikes[0].buyAt).toBe('2021-02-01');
    expect(bikes[0].addedAt).toBe('2022-02-02');
    expect(bikes[0].type).toBe('VTT');
    expect(bikes[0].totalKm).toBe(1786);
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

test('Check if Bike is created from json', () => {
    expect(bike.id).toBe('eeefzfz');
    expect(bike.name).toBe('test');
    expect(bike.electric).toBe(false);
    expect(bike.kmPerWeek).toBe(123);
    expect(bike.buyAt).toBe('2021-02-01');
    expect(bike.addedAt).toBe('2022-09-02');
    expect(bike.type).toBe('Ville');
    expect(bike.totalKm).toBe(487);
});