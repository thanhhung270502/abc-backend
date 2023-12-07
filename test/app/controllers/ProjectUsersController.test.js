const request = require('supertest');

const app = require('../../../src/index');

const mockData = {
    validProject: {
        name: 'Hội thảo Bảo vệ Môi trường Mùa hè xanh UPDATE',
        description: 'Hội thảo thường niên về bảo vệ môi trường và sử dụng bền vững tại vùng Đông Nam Á.',
        location: 'Công viên Cây xanh, Thành phố X UPDATE',
        start_date: '2023-06-15',
        end_date: '2023-06-17',
        quantity: 2000,
        uni_id: 1,
    },
    invalidProject: {
        start_date: '2023-06-15',
        quantity: 2000,
    },
    adminAccount: {
        email: 'admin@gmail.vn',
        password: '123456',
    },
    leaderAccount: {
        email: 'leader@gmail.com',
        password: '123456',
    },
    studentAccount: {
        email: 'uniquestudent@gmail.com',
        password: '123456',
    },
};

describe('ProjectUsers TestCases', () => {
    let studentToken;
    let leaderToken;

    let project_user_id;
    let projectId;
    let userId;
    let requestId;

    test('student login', async () => {
        const response = await request(app).post('/users/login').send(mockData.studentAccount);
        expect(response.status).toBe(201);
        expect(response.body.role).toEqual(0);
        studentToken = response.body.accessToken;
        userId = response.body.id;
    });

    test('community leader login', async () => {
        const response = await request(app).post('/users/login').send(mockData.leaderAccount);
        expect(response.status).toBe(201);
        expect(response.body.role).toEqual(1);
        leaderToken = response.body.accessToken;
    });

    test('get-all-project-users', async () => {
        const response = await request(app).get('/project-user').send().expect(200);
    }, 6000);

    test('add-new-valid-project-user', async () => {
        const response = await request(app).post(`/project-user`).set('access-token', studentToken).send({
            project_id: 24,
        });
        expect(response.status).toBe(200);
        requestId = response.body.body.id;
    }, 6000);

    test('add-new-invalid-project-user', async () => {
        const response = await request(app)
            .post('/project-user')
            .set('access-token', studentToken)
            .send({})
            .expect(400);
    }, 6000);

    test('community-leader-approve-project-user', async () => {
        const response = await request(app).put('/project-user').set('access-token', leaderToken).send({
            project_id: 24,
            user_id: userId,
            is_checked: true,
        });
        expect(response.status).toBe(200);
    }, 6000);

    test('community-leader-reject-project-user', async () => {
        const response = await request(app).put('/project-user').set('access-token', leaderToken).send({
            project_id: 24,
            user_id: userId,
            is_checked: false,
        });
        expect(response.status).toBe(200);
    }, 6000);

    test('community-leader-approve-non-exist-project-user', async () => {
        const response = await request(app).put('/project-user').set('access-token', leaderToken).send({
            project_id: 12,
            user_id: userId,
            is_checked: true,
        });
        expect(response.status).toBe(404);
    }, 6000);

    test('reject-non-exist-project-user', async () => {
        const response = await request(app).put('/project-user').set('access-token', leaderToken).send({
            project_id: 12,
            user_id: userId,
            is_checked: false,
        });
        expect(response.status).toBe(404);
    }, 6000);

    test('delete-exist-application', async () => {
        const response = await request(app)
            .delete(`/project-user/${requestId}`)
            .set('access-token', studentToken)
            .send();
        expect(response.status).toBe(200);
    }, 6000);

    test('delete-non-exist-application', async () => {
        const response = await request(app)
            .delete(`/project-user/${requestId + 1000}`)
            .set('access-token', studentToken)
            .expect(400);
    }, 6000);
});
