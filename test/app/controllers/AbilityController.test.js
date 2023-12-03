const request = require('supertest');

const testCaseData = [
    {
        message: 'get Ability response 200 ',
        expect: 200,
    },
];

const host = 'http://localhost:3001';

describe('AbilityController TestCases', () => {
    it.each(testCaseData)('$message', async ({ expect }) => {
        await request(host).get('/ability/').expect(expect);
    });

    it('post Ability', async () => {
        await request(host).post('/ability/').send({ name: 'Cat hat' }).expect(200);
    });
});
