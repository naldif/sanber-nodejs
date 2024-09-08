import { Request, Response } from 'express';
import Category from '../models/category';

// Create Category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            message: "Success create category",
            data: category,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Get All Categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            mesasge: "Sucess get all categories",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Get Single Category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({
            message: 'Category fetched successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Update Category by ID
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndUpdate(
            { _id: req.params.id },
            req.body, 
            { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({
            message: "Success update category",
            data : category
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ 
            data: err.message,
            message: 'Failed to update category' 
        });
    }
};

// Delete Category by ID
export const deleteCategory = async (req: Request, res: Response) => {
    try {

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json({ 
            message: 'Category deleted successfully',
            data: category,
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ 
            data: err.message,
            error: 'Failed to delete category' 
        });
    }
};