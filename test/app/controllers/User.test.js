const request = require('supertest');

const app = require('../../../src/index');

const testCaseData = [
    {
        message: 'get User response 200 ',
        typ: 'get',
        route: '/users/',
        send: {},
        expect: 200,
    },
    {
        message: 'post User response 200 ',
        typ: 'post',
        route: '/users/',
        send: {
            email: 'testing@gmail.com',
            password: 'testing',
            name: 'testing',
            provider: 'manual',
            role: 2,
            uni_id: '7',
        },
        expect: 200,
    },
];

const host = 'http://localhost:3001';

describe('User TestCases', () => {
    // it.each(testCaseData)('$message', async ({ expect, typ, route, send }) => {
    //     if (typ == 'get') {
    //         const response = await request(app).get(route).send(send);
    //         console.log(response.status);
    //         expect(response.status).toBe(200);
    //     }
    //     if (typ == 'post') {
    //         const response = await request(app).post(route).send(send);
    //         expect(response.status).toBe(200);
    //     }
    // });
    test('postUser', async () => {
        const response = await request(app)
            .get('/users')
            .send({
                email: 'testing@gmail.com',
                password: 'testing',
                name: 'testing',
                provider: 'manual',
                role: 2,
                uni_id: '7',
            })
            .expect(200);
    });
});
