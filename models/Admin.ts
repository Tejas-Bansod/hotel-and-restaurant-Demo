import mongoose, { Schema, model, models } from 'mongoose';

export interface IAdmin {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'super-admin';
    createdAt?: Date;
    updatedAt?: Date;
}

const AdminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        role: {
            type: String,
            enum: ['admin', 'super-admin'],
            default: 'admin',
        },
    },
    {
        timestamps: true,
    }
);

export default models.Admin || model<IAdmin>('Admin', AdminSchema);
