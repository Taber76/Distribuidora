import request from 'supertest';
import server from '../../src/app';

describe('Item', () => {

  let token: any;
  beforeAll(async () => {
    const response = await request(server.app).post('/api/v1/user/login').send({
      username: 'Administrador',
      password: '12345678Aa'
    })
    token = response.body.token;
  })

  afterAll(async () => {
    await server.close();
  })

  /*
  
    it('should return unauthorized without token', async () => {
      let response = await request(server.app).get('/api/v1/item/getall');
      expect(response.status).toBe(401);
  
      response = await request(server.app).get('/api/v1/item/getbyid/123');
      expect(response.status).toBe(401);
  
      response = await request(server.app).get('/api/v1/item/getbydescription');
      expect(response.status).toBe(401);
  
      response = await request(server.app).put('/api/v1/item/update');
      expect(response.status).toBe(401);
  
      response = await request(server.app).delete('/api/v1/item/delete/123');
      expect(response.status).toBe(401);
    });
  */

  it('should return all items', async () => {
    const response = await request(server.app).get('/api/v1/item/getall').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(202);
    expect(response.body.items.length).toBeGreaterThan(0);
  });



});