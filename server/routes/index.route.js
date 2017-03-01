import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import authMiddle from '../helper/authMiddle';

const router = express.Router();

router.get('/health-check', (req, res) => res.send('OK'));
router.use('/auth', authRoutes);
router.use('/users', authMiddle, userRoutes);

export default router;
