//const { it } = require('node:test');
//const AbilityController = require('../../../src/app/controllers/AbilityController');
const request = require('supertest');

//it.each(testCaseData)("$message", async ({ expect, send, type }) => {});

const testCaseData = [
    {
        message: 'get Ability response 200 ',
        expect: 200,
    },
];

// it.each(testCaseData)("$message", async ({ expect, type }) => {
//   await request('http://localhost:3000/')
//     .get("/ability/")
//     .set("accept", "application/json")
//     .set("Content-Type", "application/json")
//     //.set("Authorization", "Bearer " + jwtToken(type))
//     .expect("Content-Type", /json/)
//     .expect(expect);
// });

describe('AbilityController TestCases', () => {
    it.each(testCaseData)('$message', async ({ expect }) => {
        await request('http://localhost:3000').get('/ability/').expect(expect);
    });

    it('post Ability', async () => {
        await request('http://localhost:3000').post('/ability/').send({ name: 'Cat hat' }).expect(200);
    });
});
