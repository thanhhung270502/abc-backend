const request = require('supertest');
const app = require('../../../src/index');

const mockData = {
    validProject: {
        name: 'Hội thảo Bảo vệ Môi trường Mùa hè xanh UPDATE',
        description: 'Hội thảo thường niên về bảo vệ môi trường và sử dụng bền vững tại vùng Đông Nam Á.',
        location: 'Công viên Cây xanh, Thành phố X UPDATE',
        user_id: 789,
        start_date: '2023-06-15',
        end_date: '2023-06-17',
        quantity: 2000,
        uni_ids: [1],
    },
    invalidProject: {
        start_date: '2023-06-15',
        quantity: 2000,
        uni_ids: [1],
    },
    newUser: {
        email: "supper_unique_user_20002_2002@gmail.com", 
        password: "2020", 
        name: "TEST ACCOUNT", 
        provider: "manual", 
        role: 1, 
        uni_id: 1
    }
};

describe('ProjectController TestCases', () => {
    let projectId;
    let userId;

    test('add a new valid project', async () => {
        const newProject = mockData.validProject;

        const response = await request(app).post('/project').send(newProject);

        expect(response.status).toBe(201);
        expect(response.body.data.name).toEqual(newProject.name);
        projectId = response.body.data.id;
    });

    test('add a new invalid project', async () => {
        const newProject = mockData.invalidProject;

        const response = await request(app).post('/project').send(newProject);

        expect(response.status).toBe(400);
    });

    test('approve a non-exist project', async () => {
        console.log(`/project/${projectId}/isChecked`);

        const response = await request(app)
            .put(`/project/${projectId + 9999}/isChecked`)
            .send({
                isChecked: true,
                uni_id: 1,
            });
        expect(response.status).toBe(400);
    });

    test('reject a non-exist project', async () => {
        const response = await request(app)
            .put(`/project/${projectId + 9999}/isChecked`)
            .send({
                isChecked: false,
                uni_id: 1,
            });
        expect(response.status).toBe(400);
    });

    test('approve a project', async () => {
        console.log(`/project/${projectId}/isChecked`);

        const response = await request(app).put(`/project/${projectId}/isChecked`).send({
            isChecked: true,
            uni_id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.body.data.is_checked).toEqual(true);
    });

    test('reject a project', async () => {
        const response = await request(app).put(`/project/${projectId}/isChecked`).send({
            isChecked: false,
            uni_id: 1,
        });
        expect(response.status).toBe(200);
        expect(response.body.data.is_checked).toEqual(false);
    });

    test('student apply a project', async () => {
        const user = await request(app).post('/users').send(mockData.newUser)
        userId = user.body.body.user.id
        const response = await request(app).post(`/projectUser`).send({
            "project_id": projectId,
            "user_id": userId
        });
        expect(response.status).toBe(200);
    });

    
    test('approve student apply a project', async () => {
        const response = await request(app).put(`/projectUser`).send({
            "project_id": projectId,
            "user_id": userId,
            is_checked: true
        });
        expect(response.status).toBe(200);
        expect(response.body.data.is_checked).toEqual(true);
    });

    
    test('reject student apply a project', async () => {
        const user = await request(app).post('/users').send(mockData.newUser)

        const response = await request(app).put(`/projectUser`).send({
            "project_id": projectId,
            "user_id":  userId,
            is_checked: false
        });
        expect(response.status).toBe(200);
        expect(response.body.data.is_checked).toEqual(false);
    });

    test('delete project', async () => {
        const response = await request(app).delete(`/project/${projectId}`).send();
        expect(response.status).toBe(200);
    });

    test('delete a non-existed project', async () => {
        const response = await request(app).delete(`/project/${projectId + 9999}`).send();
        expect(response.status).toBe(400);
    });
});
