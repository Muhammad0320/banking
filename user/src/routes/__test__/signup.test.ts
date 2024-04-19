import request from 'supertest';
import { app } from '../../app';
import User from '../../model/user';

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

it(' returns a 201 on valid inputs', async () => {
  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(201);
});

it('adds a cookie to the header on valid inputs', async () => {
  const response = await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();

  expect(response.body.data.name).toEqual('shit man');
  expect(response.body.data.email).toEqual('shitman@gmail.com');
});

it('asserts that the mongoDB collcection is updated', async () => {
  let user = await User.find({});

  expect(user.length).toEqual(0);

  await request(app)
    .post('/api/v1/user/signup')
    .send({
      name: 'shit man',
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr',
      status: 'shit'
    })
    .expect(201);

  user = await User.find({});

  expect(user.length).toEqual(1);
});
