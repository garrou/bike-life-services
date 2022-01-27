const { createFromList } = require("./Component");

const components = createFromList([{
    'component_id': 'flqfkldmqkf57',
    'fk_bike': 2,
    'nb_km': 458.75,
    'date_of_purchase': '2022-01-25',
    'brand': 'Inconnue',
    'image': 'monimage',
    'duration': 2568.85,
    'component_type': 'Pneu',
    'archived': false
}]);

test('Check values of component', async () => {
    expect(components.length).toBe(1);
    expect(components[0].id).toBe('flqfkldmqkf57');
    expect(components[0].bikeId).toBe(2);
    expect(components[0].brand).toBe('Inconnue');
    expect(components[0].km).toBe(458.75);
    expect(components[0].dateOfPurchase).toBe('2022-01-25');
    expect(components[0].duration).toBe(2568.85);
    expect(components[0].image).toBe('monimage');
    expect(components[0].type).toBe('Pneu');
    expect(components[0].archived).toBe(false);
});