import { currentUser, NotAuthorized, requireAuth } from '@m0banking/common';
import Auth from '../model/auth';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get(
  '/currentUser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const auth = await Auth.findById(req.currentUser?.id);

    if (!auth) {
      throw new NotAuthorized();
    }

    res.status(200).json({ status: 'success', data: auth });
  }
);

export { router as currentAuthRouter };
