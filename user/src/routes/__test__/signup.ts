import request from 'supertest';
import { app } from '../../app';

it('returns a status other than 404, to assert the route is valid', async () => {
  const { statusCode } = await request(app)
    .post('/api/v1/users/signup')
    .send({});

  expect(statusCode).not.toEqual(404);
});
