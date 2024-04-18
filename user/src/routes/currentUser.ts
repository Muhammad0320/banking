import User from '../model/user';
import express, { Request, Response } from 'express';
import { currentUser } from '../../middleware/currentUser';
import { requireAuth } from '../../middleware/requireAuth';
import { NotAuthorized } from '../../error/NotAuthorized';

const router = express.Router();

router.get(
  '/currentUser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser?.id);

    if (!currentUser) {
      throw new NotAuthorized();
    }

    res.status(200).json({ status: 'success', data: user });
  }
);

export { router as currentUserRouter };
