import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateEmail,
  updatePassword,
  updateTheme,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);
router.put('/email', authenticate, updateEmail);
router.put('/password', authenticate, updatePassword);
router.put('/theme', authenticate, updateTheme);

export default router;
