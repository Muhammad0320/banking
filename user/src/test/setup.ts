import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

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
