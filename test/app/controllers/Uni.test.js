const request = require('supertest');

const app = require('../../../src/index');

describe('Uni TestCases', () => {
    let uni_id;

    test('get-all-universities', async () => {
        const response = await request(app).get('/uni').send().expect(200);
    });

    test('add-new-valid-university', async () => {
        const response = await request(app).post('/uni/').send({ name: 'HCMUT 2' });
        expect(response.status).toBe(200);

        uni_id = response.body.body.id;
        console.log(uni_id);
    }, 6000);

    test('add-new-invalid-university', async () => {
        const response = await request(app).post('/uni/').send({}).expect(400);
    }, 6000);

    test('get-university-by-id', async () => {
        const response = await request(app).get(`/uni/${uni_id}`).send().expect(200);
    });

    test('update-exist-university', async () => {
        const response = await request(app)
            .put(`/uni/${uni_id}`)
            .send({
                name: 'New university name',
            })
            .expect(200);
    }, 6000);

    test('update-non-exist-university', async () => {
        const response = await request(app)
            .put(`/uni/${uni_id + 1000}`)
            .send({
                name: 'New university name',
            })
            .expect(400);
    }, 6000);

    test('delete-exist-university', async () => {
        const response = await request(app).delete(`/uni/${uni_id}`).expect(200);
    }, 6000);

    test('delete-non-exist-university', async () => {
        const response = await request(app)
            .delete(`/uni/${uni_id + 1000}`)
            .expect(400);
    }, 6000);
});
