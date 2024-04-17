import cookieSession from 'cookie-session';
import express, { Response } from 'express';
import { createUserRouter } from './routes/signup';
import { signinRouter } from './routes/signin';

import { currentUserRouter } from './routes/currentUser';

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

console.log('Hi mom');

const rootUrl = '/api/v1/user';

app.use(rootUrl, signinRouter);
app.use(rootUrl, createUserRouter);
app.use(rootUrl, currentUserRouter);

app.all('*', (_, res: Response) => {
  res.status(404).json({ status: 'error', data: 'Route not found' });
});

export { app };
