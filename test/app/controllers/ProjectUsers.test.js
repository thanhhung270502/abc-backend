const request = require('supertest');

const app = require('../../../src/index');

const testCaseData = [
    {
        message: 'get User Project response 200 ',
        typ: 'get',
        route: '/projectUser/',
        send: {},
        expect: 200,
    },
    {
        message: 'get User Project by ID response 200 ',
        typ: 'get',
        route: '/projectUser/getByProjectID/1',
        send: {},
        expect: 200,
    },
    {
        message: 'post User Project response 200 ',
        typ: 'post',
        route: '/projectUser/',
        send: { project_id: 5, user_id: 1 },
        expect: 200,
    },
];

describe('ProjectUsers TestCases', () => {
    let project_user_id;

    test('get-all-project-users', async () => {
        const response = await request(app).get('/projectUser').send().expect(200);
    }, 6000);

    test('add-new-valid-project-user', async () => {
        const response = await request(app).post('/projectUser').send({ project_id: 6, user_id: 1 });
        expect(response.status).toBe(200);

        project_user_id = response.body.body.id;
    }, 6000);

    test('add-new-invalid-project-user', async () => {
        const response = await request(app).post('/projectUser').send({}).expect(400);
    }, 6000);

    test('get-project-user-by-project-id', async () => {
        const response = await request(app).get('/projectUser/getByProjectID/6').send().expect(200);
    }, 6000);

    test('approve-project-user', async () => {
        const response = await request(app).put('/projectUser').send({
            project_id: 6,
            user_id: 1,
            is_checked: true,
        });
        expect(response.status).toBe(200);
    }, 6000);

    test('reject-project-user', async () => {
        const response = await request(app).put('/projectUser').send({
            project_id: 6,
            user_id: 1,
            is_checked: false,
        });
        expect(response.status).toBe(200);
    }, 6000);

    test('approve-non-exist-project-user', async () => {
        const response = await request(app).put('/projectUser').send({
            project_id: 1,
            user_id: 6,
            is_checked: true,
        });
        expect(response.status).toBe(404);
    }, 6000);

    test('reject-non-exist-project-user', async () => {
        const response = await request(app).put('/projectUser').send({
            project_id: 1,
            user_id: 6,
            is_checked: false,
        });
        expect(response.status).toBe(404);
    }, 6000);

    test('delete-exist-ability', async () => {
        const response = await request(app).delete(`/projectUser/${project_user_id}`).expect(200);
    }, 6000);

    test('delete-non-exist-ability', async () => {
        const response = await request(app)
            .delete(`/projectUser/${project_user_id + 1000}`)
            .expect(400);
    }, 6000);
});
