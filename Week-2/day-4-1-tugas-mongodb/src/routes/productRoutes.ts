import express from 'express';
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct,
    deleteProduct
} from '../controllers/productController';

import uploadMiddleware from '../middleware/multer';
import { validateProduct } from '../middleware/validateProduct';

const router = express.Router();

router.post('/product', uploadMiddleware.multiple, validateProduct, createProduct);
router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', uploadMiddleware.multiple, validateProduct, updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;