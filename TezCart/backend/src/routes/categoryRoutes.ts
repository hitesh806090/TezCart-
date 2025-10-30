import { Router } from 'express';
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllCategories);
router.get('/:slug', getCategoryBySlug);
router.post('/', authenticate, authorize('owner', 'admin'), createCategory);
router.put('/:id', authenticate, authorize('owner', 'admin'), updateCategory);
router.delete('/:id', authenticate, authorize('owner', 'admin'), deleteCategory);

export default router;
