import { currentUser, requireAuth } from '@m0banking/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/signout',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    req.session = null;

    res
      .status(200)
      .json({ status: 'success', data: 'Logged out successfully' });
  }
);

export { router as signoutRouter };
