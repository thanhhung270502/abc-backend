const request = require('supertest');

const app = require('../../../src/index');

const testCaseData = [
    {
        message: 'get User Project response 200 ',
        typ: 'get',
        route: '/projectUser/',
        send: {},
        expect: 200,
    },
    {
        message: 'get User Project by ID response 200 ',
        typ: 'get',
        route: '/projectUser/getByProjectID/1',
        send: {},
        expect: 200,
    },
    {
        message: 'post User Project response 200 ',
        typ: 'post',
        route: '/projectUser/',
        send: { project_id: 5, user_id: 1 },
        expect: 200,
    },
];

describe('UserProject TestCases', () => {
    test('postUserProject', async () => {
        const response = await request(app)
            .post('/projectUser')
            .send({
                project_id: 5,
                user_id: 1,
            })
            .expect(200);
    });
});
