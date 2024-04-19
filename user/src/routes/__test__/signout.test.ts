import request from 'supertest';
import { app } from '../../app';

it('returns a 401, if unauthenticated user tried to logout', async () => {
  await request(app)
    .post('/api/v1/user/signout')
    .send({})
    .expect(401);
});

it('returns a 200, if the user is authenticated', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/v1/user/signout')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
});
