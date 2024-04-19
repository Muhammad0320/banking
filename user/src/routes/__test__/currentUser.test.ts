import request from 'supertest';
import { app } from '../../app';

it('returns a 401, if unauthorized user access this route', async () => {
  request(app)
    .get('/api/v1/user/currentUser')
    .send()
    .expect(401);
});
