import request from 'supertest';
import { app } from '../../app';

it('returns a 401, if unauthorized user access this route', async () => {
  request(app)
    .get('/api/v1/user/currentUser')
    .send()
    .expect(401);
});

it('returns a 200, if authenticated user access this route', async () => {
  const cookie = await global.signin();

  request(app)
    .get('/api/v1/user/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
});
