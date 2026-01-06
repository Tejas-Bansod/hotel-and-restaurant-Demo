import mongoose, { Schema, model, models } from 'mongoose';

export interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface IOrder {
    _id?: string;
    items: IOrderItem[];
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress?: string;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    orderType: 'dine-in' | 'takeaway' | 'delivery' | 'room-booking';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    image: {
        type: String,
        required: true,
    },
});

const OrderSchema = new Schema<IOrder>(
    {
        items: {
            type: [OrderItemSchema],
            required: true,
            validate: {
                validator: (v: IOrderItem[]) => v.length > 0,
                message: 'Order must contain at least one item',
            },
        },
        customerName: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
        },
        customerEmail: {
            type: String,
            required: [true, 'Customer email is required'],
            trim: true,
            lowercase: true,
        },
        customerPhone: {
            type: String,
            required: [true, 'Customer phone is required'],
            trim: true,
        },
        customerAddress: {
            type: String,
            trim: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
            default: 'pending',
        },
        orderType: {
            type: String,
            enum: ['dine-in', 'takeaway', 'delivery', 'room-booking'],
            required: true,
        },
        notes: {
            type: String,
            maxlength: [500, 'Notes cannot exceed 500 characters'],
        },
    },
    {
        timestamps: true,
    }
);

export default models.Order || model<IOrder>('Order', OrderSchema);
