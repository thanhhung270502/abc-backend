// const request = require('supertest');

// const testCaseData = [
//     {
//         message: 'get User Project response 200 ',
//         typ: 'get',
//         route: '/projectUser/',
//         send: {},
//         expect: 200,
//     },
//     {
//         message: 'get User Project by ID response 200 ',
//         typ: 'get',
//         route: '/projectUser/getByProjectID/1',
//         send: {},
//         expect: 200,
//     },
//     {
//         message: 'post User Project response 200 ',
//         typ: 'post',
//         route: '/projectUser/',
//         send: { project_id: 1, user_id: 1 },
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
