const { fromList } = require("../models/ComponentStat");

const changes = fromList([{
    'label': '2022-02-09',
    'value': '4536.45',
}]);

test('Check values of component', () => {
    expect(changes.length).toBe(1);
    expect(changes[0].label).toBe('2022-02-09');
    expect(changes[0].value).toBe(4536.45);
});