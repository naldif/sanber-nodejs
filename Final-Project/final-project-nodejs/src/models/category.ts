import { Schema, model } from 'mongoose';

export interface ICategory {
    _id?: string; // Jika MongoDB, biasanya menggunakan _id
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

// Definisikan model menggunakan interface
const Category = model<ICategory>('Category', categorySchema);

export default Category;
