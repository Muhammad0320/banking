import express, { Request, Response } from 'express';
import { currentUser } from '../../../common/middleware/currentUser';
import { requireAuth } from '../../../common/middleware/requireAuth';

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
