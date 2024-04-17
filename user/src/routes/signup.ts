import express, { Request, Response } from 'express';
import User from '../model/user';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()

      .isString()
      .withMessage('Please provide a valid name'),
    body('email')
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .trim()
      .notEmpty()
      .isString()
      .withMessage('Please provide a valid password'),
    body('passwordConfirm')
      .trim()
      .notEmpty()
      .withMessage('Comfirm your password')
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
