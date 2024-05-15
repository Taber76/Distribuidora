import request from 'supertest';
import server from '../../app';

describe('User', () => {

  afterAll(async () => {
    await server.close();
  })

  it('should return unauthorized without token', async () => {
    let response = await request(server.app).get('/api/v1/user/getall');
    expect(response.status).toBe(401);

    response = await request(server.app).get('/api/v1/user/getbyid/123');
    expect(response.status).toBe(401);

    response = await request(server.app).get('/api/v1/user/getbytoken');
    expect(response.status).toBe(401);

    response = await request(server.app).put('/api/v1/user/update');
    expect(response.status).toBe(401);

    response = await request(server.app).put('/api/v1/user/updatepassword');
    expect(response.status).toBe(401);

    response = await request(server.app).delete('/api/v1/user/delete/123');
    expect(response.status).toBe(401);
  });

  it('should return user not found on login', async () => {
    const response = await request(server.app).post('/api/v1/user/login').send({
      username: 'Administrado',
      password: '12345678Aa'
    });
    expect(response.status).toBe(404);
  });

  it('should return invalid password on login', async () => {
    const response = await request(server.app).post('/api/v1/user/login').send({
      username: 'Administrador',
      password: '12345678A'
    });
    expect(response.status).toBe(401);
  });

  let token: string;
  it('should return a token on login', async () => {
    const response = await request(server.app).post('/api/v1/user/login').send({
      username: 'Administrador',
      password: '12345678Aa'
    });
    token = response.body.token;
    expect(token).toBeDefined();
    expect(response.status).toBe(202);
  });

  let user_id: string;
  it('should return all users', async () => {
    const response = await request(server.app).get('/api/v1/user/getall').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(202);
    expect(response.body.users.length).toBeGreaterThan(0);
    user_id = response.body.users[0]._id;
  });

  let keys = ['_id', 'role', 'username', 'active', 'name', 'email'];
  it('should return a user by id', async () => {
    const response = await request(server.app).get(`/api/v1/user/getbyid/${user_id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(202);
    expect(response.body.user._id).toBe(user_id);
    keys.forEach(key => expect(response.body.user[key]).toBeDefined());
  });

  it('should return error on invalid id', async () => {
    const response = await request(server.app).get('/api/v1/user/getbyid/123').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
  });


})