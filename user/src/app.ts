import cookieSession from 'cookie-session';
import express, { Response } from 'express';
import { createUserRouter } from './routes/new';

const app = express();

app.set('trust proxy', true);

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

console.log('Hi mom');

const rootUrl = '/api/v1/user';

app.use(rootUrl, createUserRouter);

app.all('*', (_, res: Response) => {
  res.status(404).json({ status: 'error', data: 'Route not found' });
});

export { app };
