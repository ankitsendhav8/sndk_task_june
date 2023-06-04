import { Router } from 'express';
import authRoutes from './controllers/authController';
// import pr from './controllers/profileController';
const router = Router();

router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
module.exports = router;
