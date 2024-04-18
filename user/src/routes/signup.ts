import User from '../model/user';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import {
  emailValidator,
  nameValidator,
  passwordConfirmationValidator,
  passwordValidator
} from '../services/validators';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',

  [
    body('passwordConfirm')
      .trim()
      .notEmpty()
      .isString()
      .withMessage('Comfirm your password'),

    body('password')
      .trim()
      .notEmpty()
      .isString()
      .withMessage('Please provide a valid password'),

    body('email')
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage('Please provide a valid email'),

    body('name')
      .trim()
      .notEmpty()
      .isString()
      .withMessage('Please provide a valid name')
  ],

  async (req: Request, res: Response) => {
    const { email, ...attrs } = req.body;

    console.log('This is the place');

    const existingUser = await User.findOne({ email });

    if (!!existingUser) {
      throw new Error('Bad request Error wooooooo');
    }

    const user = await User.buildUser({ ...attrs, email });

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
      expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
    });

    req.session = {
      jwt: token
    };

    console.log(req.session);

    return res.status(201).json({ status: 'success', data: user });
  }
);

export { router as createUserRouter };
