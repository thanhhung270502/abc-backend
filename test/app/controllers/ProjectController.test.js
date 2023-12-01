const request = require('supertest');

const testCaseData = [
    {
        message: 'get Project response 200 ',
        typ: 'get',
        expect: 200,
    },
];

const host = 'http://localhost:3001';

describe('ProjectController TestCases', () => {
    it.each(testCaseData)('$message', async ({ expect, typ }) => {
        if (typ == 'get') {
            await request(host).get('/project/').expect(expect);
        }
    });
});
