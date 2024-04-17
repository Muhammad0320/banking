import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});
