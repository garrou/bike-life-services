const { fromList, fromJson } = require('../models/Repair');

let repair, repairs;

beforeEach(() => {
    repair = fromJson({
        'repairAt': '2022-04-06',
        'reason': 'This is a test',
        'price': '205',
        'componentId': '9a447590-a613-11ec-bf8d-b93bb40d8a52'
    });

    repairs = fromList([
        {
            'id': '1',
            'repair_at': '2022-05-02',
            'reason': 'This is a test',
            'price': '200.56',
            'fk_component': '9a447590-a613-11ec-bf8d-b93bb40d8a52'
        },
        {
            'id': '2',
            'repair_at': '2022-04-02',
            'reason': 'This is a second test',
            'price': '2098.56',
            'fk_component': '9a447590-a613-11ec-bf8d-b93bb40d8a52'
        },
    ]);
});

test('Check if repair is valid', () => {
    expect(repair.isValid()).toBe(true);
});

test('Check if repairs are valid', () => {
    expect(repairs.length).toBe(2);
    expect(repairs[0].isValid()).toBe(true);
    expect(repairs[1].isValid()).toBe(true);
});

test('Check if reason length is valid with invalid length', () => {
    repair.reason = new Array(1004).join('a');
    expect(repair.isValid()).toBe(false);
});

test('Check if reason length is valid with constructor', () => {
    repair = fromJson({
        'repairAt': '2022-04-06',
        'reason': new Array(1004).join('a'),
        'price': '205',
        'componentId': '9a447590-a613-11ec-bf8d-b93bb40d8a52'
    });

    expect(repair.isValid()).toBe(true);
});