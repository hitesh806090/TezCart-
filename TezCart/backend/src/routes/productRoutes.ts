import { Router } from 'express';
import {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.post('/', authenticate, authorize('owner', 'admin'), createProduct);
router.put('/:id', authenticate, authorize('owner', 'admin'), updateProduct);
router.delete('/:id', authenticate, authorize('owner', 'admin'), deleteProduct);

export default router;
