const {fromList } = require('../models/Tip');

const tips = fromList([{
    'tip_id': 'fd5q65fd65g6d',
    'fk_topic': 'Pneu',
    'title': 'Test title',
    'content': 'Test content'
}]);

test('Check values of tip', () => {
    expect(tips.length).toBe(1);
    expect(tips[0].id).toBe('fd5q65fd65g6d');
    expect(tips[0].type).toBe('Pneu');
    expect(tips[0].title).toBe('Test title');
    expect(tips[0].content).toBe('Test content');
});