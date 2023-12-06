const request = require('supertest');

const app = require('../../../src/index');

describe('User TestCases', () => {
    let user_id;
    test('get-all-users', async () => {
        const response = await request(app).get('/users').send().expect(200);
    }, 6000);

    test('create-new-user', async () => {
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
        // user_id = response.body.body.user.user_id;
    }, 6000);

    test('get-user-by-id', async () => {
        const response = await request(app).get(`/users/1`).send().expect(200);
    }, 6000);

    // test('create-new-user', async () => {
    //     const response = await request(app)
    //         .get('/users')
    //         .send({
    //             email: 'testing@gmail.com',
    //             password: 'testing',
    //             name: 'testing',
    //             provider: 'manual',
    //             role: 2,
    //             uni_id: '7',
    //         })
    //         .expect(200);
    //     // user_id = response.body.body.user.user_id;
    // }, 6000);

    test('edit ', async () => {
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
        // user_id = response.body.body.user.user_id;
    }, 6000);
});
