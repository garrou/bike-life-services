const { fromList, fromJson } = require("../models/Component");

const components = fromList([{
    'component_id': 'flqfkldmqkf57',
    'duration': 2568.85,
    'fk_component_type': 'Pneu',
    'active': false,
    'total_km': '45',
    'brand': 'this is a test',
    'price': '587.32'
}]);

const compo = fromJson({
    'id': 'flqfkldmqkf57',
    'duration': 2568.85,
    'type': 'Pneu',
    'active': false,
    'totalKm': '45',
    'brand': 'this is a test',
    'price': '587.32'
});

test('Check values of component', () => {
    expect(components.length).toBe(1);
    expect(components[0].id).toBe('flqfkldmqkf57');
    expect(components[0].duration).toBe(2568.85);
    expect(components[0].type).toBe('Pneu');
    expect(components[0].active).toBe(false);
    expect(components[0].totalKm).toBe(45);
    expect(components[0].brand).toBe('This is a test');
    expect(components[0].price).toBe(587.32);
});

test('Test fromJson method', () => {
    expect(compo.id).toBe('flqfkldmqkf57');
    expect(compo.duration).toBe(2568.85);
    expect(compo.type).toBe('Pneu');
    expect(compo.active).toBe(false);
    expect(compo.totalKm).toBe(45);
    expect(compo.brand).toBe('This is a test');
    expect(compo.price).toBe(587.32);
});