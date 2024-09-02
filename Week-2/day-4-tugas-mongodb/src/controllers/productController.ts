import { Request, Response } from 'express';
import Product from '../models/product';
import cloudinary from '../config/cloudinary';
import { handleUpload } from '../config/cloudinary';

import { toDataURI } from "../utils/encode";

interface IUploadedImage {
    url: string; 
}

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        return res.status(400).send({
            message: "No files uploaded",
            data: null,
        });
    }

    const dataURIs = files
        .map((file: Express.Multer.File) => toDataURI(file))
        .map(handleUpload);

    try {
        const uploadedImages = await Promise.all(dataURIs) as IUploadedImage[]; // Cast to the expected type

        // Convert array of objects to array of strings
        const images = uploadedImages.map((img) => img.url); // No need to specify type here since it's inferred

        const { name, description, price, qty, category } = req.body;

        const product = new Product({
            name,
            description,
            price,
            images: images,
            qty,
            category,
        });
        await product.save();
        res.status(201).json({
            message: "Success create category",
            data: product,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json({
            mesasge: "Sucess get all products",
            data: products,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get a single product
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) 
            return res.status(404).json({ 
            message: 'Product not found' 
        });
        return res.status(200).json({
            message: 'Product fetched successfully',
            data: product
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, qty, category } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (req.files) {
            const newImages: string[] = [];
            const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
            const uploadedImages = await Promise.all(
                files.map(async (file: Express.Multer.File) => {
                    return new Promise<string>((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                            if (error) return reject(new Error(error.message));
                            if (result) {
                                resolve(result.secure_url);
                            } else {
                                reject(new Error("Image upload failed"));
                            }
                        });
                        stream.end(file.buffer);
                    });
                })
            );
            newImages.push(...uploadedImages);
            product.images = [...product.images, ...newImages];
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.qty = qty || product.qty;
        product.category = category || product.category;

        await product.save();
        return res.status(200).json({
            message: "Success update product",
            data : product
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        return res.status(200).json({ 
            message: 'Product deleted successfully',
            data: product, 
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ 
                data: error.message,
                error: 'Failed to delete category' 
            });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
