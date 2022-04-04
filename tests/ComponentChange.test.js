const ComponentChange = require('../models/ComponentChange');

const compoChange = new ComponentChange('2022-04-04', '45454.2', '587.25', 'test brand');

const changes = ComponentChange.fromList([{
    'changed_at': '2022-04-04', 
    'km_realised': '10.2', 
    'price': '87.25', 
    'brand': 'test brand 2'
}]);

const change = ComponentChange.fromJson({
    'changedAt': '2022-04-04',
    'price': '35.87',
    'brand': 'this is a brand',
    'kmRealised': '9875.56'
});

test('Check values of tip', () => {
    expect(compoChange.changedAt).toBe('2022-04-04');
    expect(compoChange.kmRealised).toBe(45454.2);
    expect(compoChange.price).toBe(587.25);
    expect(compoChange.brand).toBe('Test brand');
});

test('Check from list method', () => {
    expect(changes.length).toBe(1);
    expect(changes[0].changedAt).toBe('2022-04-04');
    expect(changes[0].kmRealised).toBe(10.2);
    expect(changes[0].price).toBe(87.25);
    expect(changes[0].brand).toBe('Test brand 2');
});

test('Check from json', () => {
    expect(change.changedAt).toBe('2022-04-04');
    expect(change.price).toBe(35.87);
    expect(change.kmRealised).toBe(9875.56);
    expect(change.brand).toBe('This is a brand');
});