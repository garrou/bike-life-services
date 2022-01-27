const { createFromList } = require('./Tip');

const tips = createFromList([{
    'tip_id': 'fd5q65fd65g6d',
    'component_type': 'Pneu',
    'title': 'Test title',
    'content': 'Test content',
    'write_date': '2022-01-25'
}]);

test('Check values of tip', async () => {
    expect(tips.length).toBe(1);
    expect(tips[0].id).toBe('fd5q65fd65g6d');
    expect(tips[0].type).toBe('Pneu');
    expect(tips[0].title).toBe('Test title');
    expect(tips[0].content).toBe('Test content');
    expect(tips[0].date).toBe('2022-01-25');
});