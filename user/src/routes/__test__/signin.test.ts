import request from 'supertest';
import { app } from '../../app';

it('return status other that 404, to assert the availablility of the route', async () => {
  const response = await request(app)
    .post('/api/v1/user/signin')
    .send({
      name: 'shit man',
      email: 'shitman@gmail.com'
    });

  expect(response.statusCode).not.toEqual(404);
});
