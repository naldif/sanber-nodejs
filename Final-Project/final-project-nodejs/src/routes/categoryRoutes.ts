// routes/categoryRoutes.js
import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController';

import { validateCategory } from '../middleware/validateCategory';

const router = express.Router();

router.post('/categories', validateCategory, createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
