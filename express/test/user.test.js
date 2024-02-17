const request = require('supertest');
const app = require('../app'); // Assuming your Express app instance is exported from app.js
const { v4: uuidv4 } = require('uuid');

describe('User API Endpoints', () => {
  // Mock data for testing
  const mockUser = {
    id: uuidv4(),
    username: 'testuser',
    age: 25,
    hobbies: ['reading', 'gaming']
  };

  // Test case for adduser endpoint
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(mockUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toContain('User testuser successfully created');
  });

  // Test case for getUsers endpoint
  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(expect.arrayContaining([mockUser]));
  });

  // Test case for getUserById endpoint
  it('should get a user by ID', async () => {
    const res = await request(app).get(`/api/users/${mockUser.id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(mockUser);
  });

  // Test case for updateUser endpoint
  it('should update a user', async () => {
    const updatedUser = { ...mockUser, age: 30 };
    const res = await request(app)
      .put(`/api/users/${mockUser.id}`)
      .send(updatedUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toContain('User testuser successfully updated');
  });

  // Test case for deleteUser endpoint
  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${mockUser.id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain(`User ${mockUser.username} successfully deleted`);
  });
});
