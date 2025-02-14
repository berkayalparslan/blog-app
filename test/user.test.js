const app = require('../app');
const request = require('supertest');

describe('/users ENDPOINT', () => {
    it('POST method should create a new user', async () => {
        const response = await request(app).post('/users').send({ name: 'Admin Adminoglu', email: 'admin@example.com' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id'); // Check if the response has an 'id' property
        expect(response.body).toHaveProperty('name', 'Admin Adminoglu');
        expect(response.body).toHaveProperty('email', 'admin@example.com');
    });
    it('GET method should retrieve all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it('GET method should retrieve a specific user', async () => {
        const response = await request(app).get('/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Admin Adminoglu');
        expect(response.body).toHaveProperty('email', 'admin@example.com');
    });
    it('PUT method should update a specific user', async () => {
        const response = await request(app).put('/users/1').send({ name: 'Updated Name', email: 'updated@example' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Updated Name');
        expect(response.body).toHaveProperty('email', 'updated@example');
    });
    it('DELETE method should delete a specific user', async () => {
        const response = await request(app).delete('/users/1');
        expect(response.status).toBe(204);
    });
});