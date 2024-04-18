import cookieSession from 'cookie-session';
import express, { Response } from 'express';
import { createUserRouter } from './routes/signup';
import { signinRouter } from './routes/signin';

import { currentUserRouter } from './routes/currentUser';
import { NotFound } from '../error/NotFound';
import { globalErrorHandler } from '../middleware/globalErrorHandler';

const app = express();

app.set('trust proxy', true);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: false
  })
);

console.log('Hi mom');

const rootUrl = '/api/v1/user';

app.use(rootUrl, signinRouter);
app.use(rootUrl, createUserRouter);
app.use(rootUrl, currentUserRouter);

app.all('*', () => {
  throw new NotFound('Route not found');
});

app.use(globalErrorHandler);

export { app };
