import request from 'supertest';
import { app } from '../../app';

it('returns a status other than 404, to assert the route is valid', async () => {
  const { statusCode } = await request(app)
    .post('/api/v1/user/signup')
    .send({});

  expect(statusCode).not.toEqual(404);
});

it('returns a 400 on invalid email', async () => {
  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',
      email: '',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(400);

  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(400);
});

it('returns a 400 on invalid name', async () => {
  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: '',
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(400);

  await request(app)
    .post('/api/v1/user/signup')
    .send({
      email: 'shitman@gmail.com',

      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(400);
});

it('returns a 400 on invalid password ', async () => {
  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',

      email: 'shitman@gmail.com',
      password: 'snr',
      passwordConfirm: 'snr',
      status: 'shit'
    })
    .expect(400);

  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',

      email: 'shitman@gmail.com',

      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(400);
});

it('returns a 400 if both inputs are not the same', async () => {
  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',

      email: 'shitman@gmail.com',

      password: 'shijgtneeewr',
      passwordConfirm: 'shijgtnjejngnrgnr',
      status: 'shit'
    })
    .expect(400);
});

it(' returns a 200 on valid inputs', async () => {
  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(200);
});
