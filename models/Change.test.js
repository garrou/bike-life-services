const { createFromList } = require("./Change");

const changes = createFromList([{
    'changed_at': '2022-02-09',
    'km_realised': 4536.45,
}]);

test('Check values of component', () => {
    expect(changes.length).toBe(1);
    expect(changes[0].changedAt).toBe('2022-02-09');
    expect(changes[0].km).toBe(4536.45);
});