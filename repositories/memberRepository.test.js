const memberRepository = require('./memberRepository');

test('Find unknown member by email', async () => {
    const resp = await memberRepository.getMember("unknown@unknow.com");
    expect(resp.rowCount).toBe(0);
});