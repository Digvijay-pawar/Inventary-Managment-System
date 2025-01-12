const request = require('supertest');
const app = require('../index');
const User = require('../models/User');
const { createToken, findUserByEmail, findUserById, hashPassword, comparePassword } = require('../services/user.service');

// Mock services and database interactions
jest.mock('../services/user.service');
jest.mock('../models/User');

describe('User Controller Tests', () => {
    describe('Register User', () => {
        it('should return 400 if any field is missing', async () => {
            const res = await request(app).post('/api/register').send({
                email: 'test@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Incomplete information');
        });

        it('should return 409 if user already exists', async () => {
            findUserByEmail.mockResolvedValue({ email: 'test@example.com' });
            const res = await request(app).post('/api/register').send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(409);
            expect(res.body.message).toBe('User already exists');
        });

        it('should create a new user and return 201', async () => {
            findUserByEmail.mockResolvedValue(null);
            hashPassword.mockResolvedValue('hashed_password');
            User.create.mockResolvedValue({
                _id: 'user_id',
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashed_password',
            });
            createToken.mockResolvedValue('test_token');

            const res = await request(app).post('/api/register').send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

            expect(res.status).toBe(201);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('User created successfully');
            expect(res.body.data.user.email).toBe('test@example.com');
        });
    });

    describe('Login User', () => {
        it('should return 400 if email or password is missing', async () => {
            const res = await request(app).post('/api/login').send({
                email: 'test@example.com',
            });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Incomplete information');
        });

        it('should return 404 if user is not found', async () => {
            findUserByEmail.mockResolvedValue(null);
            const res = await request(app).post('/api/login').send({
                email: 'notfound@example.com',
                password: 'password123',
            });
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('User not found');
        });

        it('should return 401 for invalid credentials', async () => {
            findUserByEmail.mockResolvedValue({
                email: 'test@example.com',
                password: 'hashed_password',
            });
            comparePassword.mockResolvedValue(false);

            const res = await request(app).post('/api/login').send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Invalid credentials');
        });

        it('should return 200 and a token for valid login', async () => {
            findUserByEmail.mockResolvedValue({
                _id: 'user_id',
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashed_password',
            });
            comparePassword.mockResolvedValue(true);
            createToken.mockResolvedValue('test_token');

            const res = await request(app).post('/api/login').send({
                email: 'test@example.com',
                password: 'password123',
            });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('User logged in successfully');
            expect(res.body.data.token).toBe('test_token');
        });
    });

    describe('Get Profile', () => {
        it('should return 401 if no token is provided', async () => {
            const res = await request(app).get('/api/profile');
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Unauthorized');
        });

        it('should return 404 if user is not found', async () => {
            findUserById.mockResolvedValue(null);

            const res = await request(app)
                .get('/api/profile')
                .set('Authorization', 'Bearer valid_token');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('User not found');
        });

        it('should return 200 and user data for a valid token', async () => {
            findUserById.mockResolvedValue({
                _id: 'user_id',
                name: 'Test User',
                email: 'test@example.com',
            });

            const res = await request(app)
                .get('/api/profile')
                .set('Authorization', 'Bearer valid_token');

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('User data fetched successfully');
            expect(res.body.data.email).toBe('test@example.com');
        });
    });
});
