import request from 'supertest';
import { app } from '../../app';

it('returns a 401, if unauthenticated user tried to logout', async () => {
  await request(app)
    .post('/api/v1/user/signout')
    .send({})
    .expect(401);
});
