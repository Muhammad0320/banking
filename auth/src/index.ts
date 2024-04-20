import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const port = 3000;

  if (!process.env.JWT_KEY) {
    throw new Error(' JWT_KEY not found ');
  }

  app.listen(port, () => {
    console.log('App running on port ', port);
  });
};

start();
