import express, { Request, Response } from 'express';
import { currentUser } from '../../../common/middleware/currentUser';
import { requireAuth } from '../../../common/middleware/requireAuth';
import { emailValidator, nameValidator } from '../services/validators';
import { paramsChecker } from '../../../common/middleware/paramsChecker';
import User from '../model/user';
import { BadRequest } from '../../error/BadRequest';

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
