const request = require('supertest');

const testCaseData = [
    {
        message: 'get Ability response 200 ',
        expect: 200,
    },
];

describe('AbilityController TestCases', () => {
    it.each(testCaseData)('$message', async ({ expect }) => {
        await request('http://localhost:3000').get('/ability/').expect(expect);
    });

    it('post Ability', async () => {
        await request('http://localhost:3000').post('/ability/').send({ name: 'Cat hat' }).expect(200);
    });
});
