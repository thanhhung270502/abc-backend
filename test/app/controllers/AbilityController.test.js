const request = require('supertest');
const app = require('../../../src/index');

describe('AbilityController TestCases', () => {
    let ability_id;

    test('get-all-abilities', async () => {
        const response = await request(app).get('/abilitys').send().expect(200);
    });

    test('add-new-valid-ability', async () => {
        const response = await request(app).post('/abilitys/').send({ name: 'Example ability' });
        expect(response.status).toBe(200);

        ability_id = response.body.body.id;
    }, 6000);

    test('add-new-invalid-ability', async () => {
        const response = await request(app).post('/abilitys/').send({}).expect(400);
    }, 6000);

    test('get-abilitie-by-id', async () => {
        const response = await request(app).get(`/abilitys/${ability_id}`).send().expect(200);
    });

    test('update-exist-ability', async () => {
        const response = await request(app)
            .put(`/abilitys/${ability_id}`)
            .send({
                name: 'New ability name',
            })
            .expect(200);
    }, 6000);

    test('update-non-exist-ability', async () => {
        const response = await request(app)
            .put(`/abilitys/${ability_id + 1000}`)
            .send({
                name: 'New ability name',
            })
            .expect(400);
    }, 6000);

    test('delete-exist-ability', async () => {
        const response = await request(app).delete(`/abilitys/${ability_id}`).expect(200);
    }, 6000);

    test('delete-non-exist-ability', async () => {
        const response = await request(app)
            .delete(`/abilitys/${ability_id + 1000}`)
            .expect(400);
    }, 6000);
});
