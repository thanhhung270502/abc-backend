const request = require('supertest');

const app = require('../../../src/index');

const testCaseData = [
    {
        message: 'get Uni response 200 ',
        typ: 'get',
        route: '/uni/',
        send: {},
        expect: 200,
    },
    {
        message: 'post Uni response 200',
        typ: 'post',
        route: '/uni/',
        send: { name: 'test' },
        expect: 200,
    },
    {
        message: 'put Uni response 200',
        typ: 'put',
        route: '/uni/',
        send: { name: 'test' },
        expect: 200,
    },
    {
        message: 'del Uni response 200',
        typ: 'del',
        route: '/uni/',
        send: { name: 'test' },
        expect: 200,
    },
];

describe('Uni TestCases', () => {
    let uni_id;

    test('get-all-universities', async () => {
        const response = await request(app).get('/uni').send().expect(200);
    });
});
