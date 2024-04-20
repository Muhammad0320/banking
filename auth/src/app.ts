import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { globalErrorHandler, NotFound } from '@m0banking/common';

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

const rootUrl = '/api/v1/auth';

app.use(rootUrl, signupRouter);
app.use(rootUrl, signinRouter);
app.use(rootUrl, signoutRouter);

app.all('*', () => {
  throw new NotFound('Route not found');
});

app.use(globalErrorHandler);

export { app };
