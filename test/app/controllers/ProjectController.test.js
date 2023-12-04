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
        email: 'student@vbchain.vn',
        password: '123456',
    },
};

describe('ProjectController TestCases', () => {
    let projectId;
    let userId;
    let requestId;

    let leaderToken;
    let adminToken;
    let studentToken;

    test('community leader login', async () => {
        const response = await request(app).post('/users/login').send(mockData.leaderAccount);
        expect(response.status).toBe(201);
        expect(response.body.role).toEqual(1);
        leaderToken = response.body.accessToken;
    });

    test('add a new valid project', async () => {
        const response = await request(app)
            .post('/projects')
            .set('access-token', leaderToken)
            .send(mockData.validProject);

        expect(response.status).toBe(201);
        expect(response.body.data.name).toEqual(mockData.validProject.name);
        projectId = response.body.data.id;
    });

    test('add a new invalid project', async () => {
        const response = await request(app)
            .post('/projects')
            .set('access-token', leaderToken)
            .send(mockData.invalidProject);

        expect(response.status).toBe(400);
    });

    test('university adminstrator login', async () => {
        const response = await request(app).post('/users/login').send(mockData.adminAccount);
        expect(response.status).toBe(201);
        expect(response.body.role).toEqual(2);
        adminToken = response.body.accessToken;
    });

    test('approve a non-exist project', async () => {
        const response = await request(app)
            .put(`/project/${projectId + 9999}/isChecked`)
            .send({
                isChecked: true,
                uni_id: 1,
            });
        expect(response.status).toBe(404);
    });

    test('reject a non-exist project', async () => {
        const response = await request(app)
            .put(`/project/isChecked${projectId + 9999}`)
            .set('access-token', adminToken)
            .send({
                isChecked: false,
            });
        expect(response.status).toBe(404);
    });

    test('approve a project', async () => {
        const response = await request(app)
            .put(`/projects/isChecked/${projectId}`)
            .set('access-token', adminToken)
            .send({
                isChecked: true,
            });
        expect(response.status).toBe(200);
        expect(response.body.data.is_checked).toEqual(true);
    });

    test('student login', async () => {
        const response = await request(app).post('/users/login').send(mockData.studentAccount);
        expect(response.status).toBe(201);
        expect(response.body.role).toEqual(0);
        studentToken = response.body.accessToken;
        userId = response.body.id;
    });

    test('student apply a project', async () => {
        const response = await request(app).post(`/project-user`).set('access-token', studentToken).send({
            project_id: projectId,
        });
        expect(response.status).toBe(200);
        requestId = response.body.body.id
    });

    test('community leader approve student apply a project', async () => {
        const response = await request(app).put(`/project-user`).set('access-token', leaderToken).send({
            project_id: projectId,
            user_id: userId,
            is_checked: true,
        });
        expect(response.status).toBe(200);
        expect(response.body.data.is_checked).toEqual(true);
    });

    test('community leader reject student who has been previously approved', async () => {
        const response = await request(app).put(`/project-user`).set('access-token', leaderToken).send({
            project_id: projectId,
            user_id: userId,
            is_checked: false,
        });
        expect(response.status).toBe(200);
    });

    test('student delete a request to a project', async () => {
        const response = await request(app).delete(`/project-user/${requestId}`).set('access-token', studentToken).send();
        expect(response.status).toBe(200);
    })


    test('community leader delete project', async () => {
        const response = await request(app).delete(`/projects/${projectId}`).set('access-token', leaderToken).send();
        expect(response.status).toBe(200);
    });

    test('community leader delete a non-existed project', async () => {
        const response = await request(app)
            .delete(`/projects/${projectId + 9999}`)
            .set('access-token', leaderToken)
            .send();
        expect(response.status).toBe(404);
    });
});
