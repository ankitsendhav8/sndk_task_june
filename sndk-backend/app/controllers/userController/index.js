/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default */
import { Router } from 'express';

import UserController from './user.controller';

const router = Router();

router.get('/:id', UserController.getDetails);
router.put('/:id', UserController.updateDetails);

export default router;
