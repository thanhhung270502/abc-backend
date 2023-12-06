const request = require('supertest');

const app = require('../../../src/index');

describe('User TestCases', () => {
    let user_id;
    test('get-all-users', async () => {
        const response = await request(app).get('/users').send().expect(200);
    }, 6000);

    test('create-new-user', async () => {
        const response = await request(app)
            .post('/users/signup')
            .send({
                email: 'testing@gmail.com',
                password: 'testing123',
                name: 'testing',
                avatar: 'https://media.doisongphapluat.com/media/nguyen-thi-quynh/2023/01/16/nhan-sac-than-tien-ty-ty-the-he-moi-vuong-so-nhien-dspl-3.png',
                role: 2,
                uni_id: '7',
            })
            .expect(200);
        user_id = response.body.id;
    }, 6000);

    test('get-user-by-id', async () => {
        const response = await request(app).get(`/users/1`).send().expect(200);
    }, 6000);

    test('update-name-of-valid-user ', async () => {
        const response = await request(app)
            .put(`/users/${user_id}`)
            .send({
                name: 'newTesting',
                avatar: '',
                uni_id: '7',
            })
            .expect(200);
    }, 6000);

    test('update-name-of-invalid-user ', async () => {
        const response = await request(app)
            .put(`/users/${user_id + 1000}`)
            .send({
                name: 'newTesting',
                avatar: '',
                uni_id: '7',
            })
            .expect(404);
    }, 6000);

    test('delete-exist-user', async () => {
        const response = await request(app).delete(`/users/${user_id}`).expect(200);
    }, 6000);

    test('delete-non-exist-user', async () => {
        const response = await request(app)
            .delete(`/users/${user_id + 1000}`)
            .expect(404);
    }, 6000);
});
