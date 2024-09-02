import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const validateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
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