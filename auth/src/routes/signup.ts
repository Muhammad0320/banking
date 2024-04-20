import jwt from 'jsonwebtoken';
import Auth from '../model/auth';
import express, { Request, Response } from 'express';
import {
  emailValidator,
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

    const existingAuth = await Auth.findOne({ email });

    if (!!existingAuth) {
      throw new BadRequest(
        'This email is in use, Please use another email and try again! '
      );
    }

    const newAuth = await Auth.buildAuth({ ...attrs, email });

    const token = jwt.sign(
      { id: newAuth.id, email: newAuth.email },
      process.env.JWT_KEY!,
      {
        expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
      }
    );

    req.session = {
      jwt: token
    };

    return res.status(201).json({ status: 'success', data: newAuth });
  }
);

export { router as createAuthRouter };
