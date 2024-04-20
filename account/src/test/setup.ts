import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: any;

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'my-super-long-and-ultra-secured-jwt-secret-key';
  process.env.JWT_EXPIRES_IN = '24';
  mongo = await MongoMemoryServer.create();

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

global.signin = async () => {
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

  const cookie = response.get('Set-Cookie');

  if (!cookie) {
    throw new Error('cookie not found');
  }

  return cookie;
};
