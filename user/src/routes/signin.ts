import jwt from 'jsonwebtoken';
import User from '../model/user';
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

    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
      throw new BadRequest('Invalid login credentials');
    }

    const isCorrectPassword = await Passwords.compare(
      existingUser.password,
      password
    );

    if (!isCorrectPassword) {
      throw new BadRequest('Invalid login credentials');
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_KEY!, {
      expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
    });

    req.session = {
      jwt: token
    };

    res.status(200).json({ status: 'success', data: existingUser });
  }
);

export { router as signinRouter };
