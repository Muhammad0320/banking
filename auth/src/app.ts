import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

import { globalErrorHandler, NotFound } from '@m0banking/common';
import { signupRouter } from './routes/signup';

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

app.use(rootUrl, signupRouter);
app.use(rootUrl, signinRouter);
app.use(rootUrl, signoutRouter);

app.all('*', () => {
  throw new NotFound('Route not found');
});

app.use(globalErrorHandler);

export { app };
