import { body } from 'express-validator';
import { Request } from 'express';

export const nameValidator = () =>
  body('name')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please provide a valid name');

export const emailValidator = () =>
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email');

export const passwordValidator = () =>
  body('password')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 chars');

export const passwordConfirmationValidator = () =>
  body('passwordConfirm')
    .trim()
    .notEmpty()
    .isString()
    .custom((input: string, { req }) => input === req.body.password)
    .withMessage('Passwords are not the same');
