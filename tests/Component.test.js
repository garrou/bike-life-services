const { fromList } = require("../models/Component");

const components = fromList([{
    'component_id': 'flqfkldmqkf57',
    'duration': 2568.85,
    'fk_component_type': 'Pneu',
    'active': false,
    'total_km': '45'
}]);

test('Check values of component', () => {
    expect(components.length).toBe(1);
    expect(components[0].id).toBe('flqfkldmqkf57');
    expect(components[0].duration).toBe(2568.85);
    expect(components[0].type).toBe('Pneu');
    expect(components[0].active).toBe(false);
    expect(components[0].totalKm).toBe(45);
});