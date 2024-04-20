import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const port = 3000;

  if (!process.env.JWT_KEY) {
    throw new Error(' JWT_KEY not found ');
  }

  if (!process.env.MONGO_URI) {
    throw new Error(' MONGO_URI not found ');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('connected to mongoDB');
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log('App running on port ', port);
  });
};

start();
