const ComponentHistoric = require('../models/ComponentHistoric');

const compoHistoric = new ComponentHistoric('test key', '45454.2')

test('Check values of tip', () => {
    expect(compoHistoric.label).toBe('test key');
    expect(compoHistoric.value).toBe(45454.2);
});