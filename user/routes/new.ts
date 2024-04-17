import express, { Request, Response } from 'express';
import User from '../model/user';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, ...attrs } = req.body;

  const existingUser = await User.findOne({ email });

  if (!!existingUser) {
    throw new Error('Bad request Error');
  }

  const user = await User.buildUser({ ...attrs, email });

  return res.status(201).json({ status: 'success', data: user });
});

export { router as createUserRouter };
