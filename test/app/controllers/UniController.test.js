const request = require('supertest');

const app = require('../../../src/index');

describe('Uni TestCases', () => {
    let uni_id;

    test('get-all-universities', async () => {
        const response = await request(app).get('/unis').send().expect(200);
    }, 30000);

    test('add-new-valid-university', async () => {
        const response = await request(app).post('/unis/').send({ name: 'HCMUT 2' });
        expect(response.status).toBe(200);

        uni_id = response.body.body.id;
    }, 30000);

    test('add-new-invalid-university', async () => {
        const response = await request(app).post('/unis/').send({}).expect(400);
    }, 30000);

    test('get-university-by-id', async () => {
        const response = await request(app).get(`/unis/${uni_id}`).send().expect(200);
    }, 30000);

    test('update-exist-university', async () => {
        const response = await request(app)
            .put(`/unis/${uni_id}`)
            .send({
                name: 'New university name',
            })
            .expect(200);
    }, 30000);

    test('update-non-exist-university', async () => {
        const response = await request(app)
            .put(`/unis/${uni_id + 1000}`)
            .send({
                name: 'New university name',
            })
            .expect(400);
    }, 30000);

    test('delete-exist-university', async () => {
        const response = await request(app).delete(`/unis/${uni_id}`).expect(200);
    }, 30000);

    test('delete-non-exist-university', async () => {
        const response = await request(app)
            .delete(`/unis/${uni_id + 1000}`)
            .expect(400);
    }, 30000);
});
