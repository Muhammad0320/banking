import cookieSession from 'cookie-session';
import express from 'express';

const app = express();

app.set('trust proxy', true);

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

export { app };
