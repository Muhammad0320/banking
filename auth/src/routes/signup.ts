import User from '../model/user';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import {
  emailValidator,
  nameValidator,
  passwordConfirmationValidator,
  passwordValidator
} from '../services/validators';
import { BadRequest, requestValidator } from '@m0banking/common';

const router = express.Router();

router.post(
  '/signup',

  [emailValidator(), passwordValidator(), passwordConfirmationValidator()],

  requestValidator,

  async (req: Request, res: Response) => {
    const { email, ...attrs } = req.body;

    const existingUser = await User.findOne({ email });

    if (!!existingUser) {
      throw new BadRequest(
        'This email is in use, Please use another email and try again! '
      );
    }

    const user = await User.buildUser({ ...attrs, email });

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
      expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
    });

    req.session = {
      jwt: token
    };

    return res.status(201).json({ status: 'success', data: user });
  }
);

export { router as createUserRouter };
