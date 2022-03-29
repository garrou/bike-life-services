const { fromList } = require('../models/Diagnostic');

let diagnostics;

beforeEach(() => {
    diagnostics = fromList([
        {
            'id': '1',
            'title': 'Test',
            'bike_type': 'VTT',
            'component': 'Pneus',
            'content': 'This is a test'
        }
    ]);
});

test('Check values of diagnostics', () => {
    expect(diagnostics.length).toBe(1);
    expect(diagnostics[0].id).toBe('1');
    expect(diagnostics[0].title).toBe('Test');
    expect(diagnostics[0].type).toBe('VTT');
    expect(diagnostics[0].component).toBe('Pneus');
    expect(diagnostics[0].content).toBe('This is a test');
});