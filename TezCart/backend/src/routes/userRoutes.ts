import { Router } from 'express';
import { getAllUsers, toggleBanUser, getStats } from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('owner', 'admin'), getAllUsers);
router.put('/:id/ban', authenticate, authorize('owner', 'admin'), toggleBanUser);
router.get('/stats', authenticate, authorize('owner', 'admin'), getStats);

export default router;
