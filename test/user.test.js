const app = require('../app');
const request = require('supertest');

describe('/users ENDPOINT', () => {
    it('POST method should create a new user', async () => {
        const response = await request(app).post('/users').send({ name: 'Admin Adminoglu', email: 'admin@example.com' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id'); // Check if the response has an 'id' property
        expect(response.body).toHaveProperty('name', 'Admin Adminoglu');
        expect(response.body).toHaveProperty('email', 'admin@example.com');
    });
    it('GET method should retrieve all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it('GET method should retrieve a specific user', async () => {
        const newUser = await request(app).post('/users').send({ name: 'Admin Adminoglu', email: 'admin@example.com' });
        const response = await request(app).get(`/users/${newUser.body._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', newUser.body._id);
        expect(response.body).toHaveProperty('name', 'Admin Adminoglu');
        expect(response.body).toHaveProperty('email', 'admin@example.com');
    });
    it('/email PUT method should update a specific user email', async () => {
        const newUser = await request(app).post('/users').send({ name: 'Admin Adminoglu', email: 'admin@example.com' });
        const response = await request(app).put(`/users/${newUser.body._id}/email`).send({ email: 'updated@example.com' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', newUser.body._id);
        expect(response.body).toHaveProperty('name', 'Admin Adminoglu');
        expect(response.body).toHaveProperty('email', 'updated@example.com');
    });
    it('DELETE method should delete a specific user', async () => {
        const newUser = await request(app).post('/users').send({ name: 'Admin Adminoglu', email: 'admin@example.com' });
        const response = await request(app).delete(`/users/${newUser.body._id}`);
        expect(response.status).toBe(204);
    });
});