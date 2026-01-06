import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: 'appetizers' | 'main-course' | 'desserts' | 'beverages' | 'rooms';
    image: string;
    availability: boolean;
    indianSpecialty: boolean;
    spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot';
    vegetarian?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['appetizers', 'main-course', 'desserts', 'beverages', 'rooms'],
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        availability: {
            type: Boolean,
            default: true,
        },
        indianSpecialty: {
            type: Boolean,
            default: false,
        },
        spiceLevel: {
            type: String,
            enum: ['mild', 'medium', 'hot', 'extra-hot'],
        },
        vegetarian: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default models.Product || model<IProduct>('Product', ProductSchema);
