const request = require('supertest');

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

const host = 'http://localhost:3001';

describe('UserProject TestCases', () => {
    it.each(testCaseData)('$message', async ({ expect, typ, route, send }) => {
        if (typ == 'get') {
            await request(host).get(route).send(send).expect(expect);
        }
        if (typ == 'post') {
            await request(host).post(route).send(send).expect(expect);
        }
        if (typ == 'put') {
            await request(host).put(route).send(send).expect(expect);
        }
        if (typ == 'del') {
            await request(host).del(route).send(send).expect(expect);
        }
    });
});
