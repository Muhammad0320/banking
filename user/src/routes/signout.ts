import express, { Request, Response } from 'express';
import { currentUser } from '../../middleware/currentUser';
import { requireAuth } from '../../middleware/requireAuth';

const router = express.Router();

router.post(
  '/signout',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    req.currentUser = null;

    res
      .status(200)
      .json({ status: 'success', data: 'Logged out successfully' });
  }
);

export { router as signoutRouter };
