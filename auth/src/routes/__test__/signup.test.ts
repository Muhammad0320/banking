import request from 'supertest';
import { app } from '../../app';
import Auth from '../../model/auth';

it('returns a status other than 404, to assert the route is valid', async () => {
  const { statusCode } = await request(app)
    .post('/api/v1/auth/signup')
    .send({});

  expect(statusCode).not.toEqual(404);
});

it('returns a 400 on invalid email', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: '',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr'
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr'
    })
    .expect(400);
});

it('returns a 400 on invalid password ', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'shitman@gmail.com',
      password: 'snr',
      passwordConfirm: 'snr'
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'shitman@gmail.com',

      passwordConfirm: 'shijgtnjngnrgnr'
    })
    .expect(400);
});

it('returns a 400 if both inputs are not the same', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'shitman@gmail.com',

      password: 'shijgtneeewr',
      passwordConfirm: 'shijgtnjejngnrgnr'
    })
    .expect(400);
});

it(' returns a 201 on valid inputs', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr'
    })
    .expect(201);
});

it('adds a cookie to the header on valid inputs', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();

  expect(response.body.data.email).toEqual('shitman@gmail.com');
});

it('asserts that the mongoDB collcection is updated', async () => {
  let auth = await Auth.find({});

  expect(auth.length).toEqual(0);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'shitman@gmail.com',
      password: 'shijgtnjngnrgnr',
      passwordConfirm: 'shijgtnjngnrgnr'
    })
    .expect(201);

  auth = await Auth.find({});

  expect(auth.length).toEqual(1);
});
