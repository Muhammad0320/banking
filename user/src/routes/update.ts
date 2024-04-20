import express, { Request, Response } from 'express';

import User from '../model/user';
import { BadRequest, currentUser, requireAuth } from '@m0banking/common';
import { emailValidator, nameValidator } from '../services/validators';

const router = express.Router();

router.patch(
  '/:id',
  currentUser,
  requireAuth,
  paramsChecker('id'),
  nameValidator().optional(),
  emailValidator().optional(),
  async (req: Request, res: Response) => {
    const inputs = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, inputs);

    if (!user) {
      throw new BadRequest('Please validate inputs');
    }

    res.status(200).json({ status: 'success', data: user });
  }
);

export { router as updateUserRouter };
