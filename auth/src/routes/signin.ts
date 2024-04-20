import jwt from 'jsonwebtoken';
import Auth from '../model/auth';
import { Passwords } from '../services/Password';
import express, { Request, Response } from 'express';
import { emailValidator, passwordValidator } from '../services/validators';
import { BadRequest, requestValidator } from '@m0banking/common';

const router = express.Router();

router.post(
  '/signin',

  [emailValidator(), passwordValidator()],

  requestValidator,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingAuth = await Auth.findOne({ email }).select('+password');

    if (!existingAuth) {
      throw new BadRequest('Invalid login credentials');
    }

    const isCorrectPassword = await Passwords.compare(
      existingAuth.password,
      password
    );

    if (!isCorrectPassword) {
      throw new BadRequest('Invalid login credentials');
    }

    const token = jwt.sign(
      { id: existingAuth.id, email: existingAuth.email },
      process.env.JWT_KEY!,
      {
        expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
      }
    );

    req.session = {
      jwt: token
    };

    res.status(200).json({ status: 'success', data: existingAuth });
  }
);

export { router as signinRouter };
