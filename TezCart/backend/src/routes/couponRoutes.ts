import { Router } from 'express';
import {
  getAllCoupons,
  validateCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../controllers/couponController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('owner', 'admin'), getAllCoupons);
router.get('/validate/:code', validateCoupon);
router.post('/', authenticate, authorize('owner', 'admin'), createCoupon);
router.put('/:id', authenticate, authorize('owner', 'admin'), updateCoupon);
router.delete('/:id', authenticate, authorize('owner', 'admin'), deleteCoupon);

export default router;
