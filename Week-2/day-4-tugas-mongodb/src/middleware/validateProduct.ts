import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
    // Combine files and body
    if (req.files) {
        const images = (req.files as Express.Multer.File[]).map(file => file.path);
        req.body.images = images;
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        images: Yup.array().of(Yup.string().url('Invalid URL format for images')).required('Images are required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        qty: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
        category: Yup.string().required('Category is required'),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            const validationErrors = error.inner.map(err => ({
                path: err.path,
                type: err.type,
                message: err.message
            }));
            res.status(400).json({ errors: validationErrors });
        } else {
            res.status(500).json({ type: 'Unknown', message: 'An unexpected error occurred' });
        }
    }
};

