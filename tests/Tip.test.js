const {fromList } = require('../models/Tip');

const tips = fromList([
    {
        'tip_id': 'fd5q65fd65g6d',
        'fk_topic': 'Pneu',
        'title': 'Test title',
        'content': 'Test content',
        'video_id': 'N4U9ajY8jrQ'
    },
    {
        'tip_id': 'fd5q65fd65g6d',
        'fk_topic': 'Pneu',
        'title': 'Test title',
        'content': 'Test content'
    },
]);

test('Check values of tip', () => {
    expect(tips.length).toBe(2);

    expect(tips[0].id).toBe('fd5q65fd65g6d');
    expect(tips[0].type).toBe('Pneu');
    expect(tips[0].title).toBe('Test title');
    expect(tips[0].content).toBe('Test content');
    expect(tips[0].video).toBe('N4U9ajY8jrQ');
    expect(tips[0].video.length).toBe(11);

    expect(tips[1].id).toBe('fd5q65fd65g6d');
    expect(tips[1].type).toBe('Pneu');
    expect(tips[1].title).toBe('Test title');
    expect(tips[1].content).toBe('Test content');
    expect(tips[1].video).toBe(undefined);
});