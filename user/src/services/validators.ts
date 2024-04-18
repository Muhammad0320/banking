import { body } from 'express-validator';

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
    .withMessage('Please provide a valid password');

export const passwordConfirmationValidator = () =>
  body('passwordConfirm')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Comfirm your password');
