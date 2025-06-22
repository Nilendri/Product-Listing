import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController';
import upload from '../middleware/upload';

const router = Router();
router.get('/', getProducts);

router.post('/', upload.array('images'), createProduct);
router.put('/:id', upload.array('images'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
