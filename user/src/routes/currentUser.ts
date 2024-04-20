import { currentUser, NotAuthorized, requireAuth } from '@m0banking/common';
import User from '../model/user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get(
  '/currentUser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser?.id);

    if (!user) {
      throw new NotAuthorized();
    }

    res.status(200).json({ status: 'success', data: user });
  }
);

export { router as currentUserRouter };
