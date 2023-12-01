const request = require('supertest');

const testCaseData = [
    {
        message: 'get Project response 200 ',
        typ: 'get',
        expect: 200,
    },
];

describe('ProjectController TestCases', () => {
    it.each(testCaseData)('$message', async ({ expect, typ }) => {
        if (typ == 'get') {
            await request('http://localhost:3000').get('/project/').expect(expect);
        }
    });
});
