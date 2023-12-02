// const request = require('supertest');

// const testCaseData = [
//     {
//         message: 'get User response 200 ',
//         typ: 'get',
//         route: '/users/',
//         send: {},
//         expect: 200,
//     },
//     {
//         message: 'post User response 200 ',
//         typ: 'post',
//         route: '/users/',
//         send: {
//             email: 'testing@gmail.com',
//             password: 'testing',
//             name: 'testing',
//             avatar: 'testing',
//             provider: 'manual',
//             role: 2,
//             uni_id: '7',
//         },
//         expect: 200,
//     },
// ];

// const host = 'http://localhost:3001';

// describe('UserProject TestCases', () => {
//     it.each(testCaseData)('$message', async ({ expect, typ, route, send }) => {
//         if (typ == 'get') {
//             await request(host).get(route).send(send).expect(expect);
//         }
//         if (typ == 'post') {
//             await request(host).post(route).send(send).expect(expect);
//         }
//     });
// });
