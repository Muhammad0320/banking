import User from '../model/user';
import express, { Request, Response } from 'express';
import {
  emailValidator,
  nameValidator,
  passwordConfirmationValidator,
  passwordValidator
} from '../services/validators';

const router = express.Router();

router.post(
  '/',
  [
    nameValidator,
    emailValidator,
    passwordValidator,
    passwordConfirmationValidator
  ],
  async (req: Request, res: Response) => {
    const { email, ...attrs } = req.body;

    const existingUser = await User.findOne({ email });

    if (!!existingUser) {
      throw new Error('Bad request Error');
    }

    const user = await User.buildUser({ ...attrs, email });

    return res.status(201).json({ status: 'success', data: user });
  }
);

export { router as createUserRouter };
