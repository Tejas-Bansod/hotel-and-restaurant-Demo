import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// GET all orders (admin only)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let query = {};

        if (status) {
            query = { status };
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: orders,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch orders',
            },
            { status: 500 }
        );
    }
}

// POST create new order
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        // Validate required fields
        if (!body.items || body.items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order must contain at least one item',
                },
                { status: 400 }
            );
        }

        if (!body.customerName || !body.customerEmail || !body.customerPhone) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Customer information is required',
                },
                { status: 400 }
            );
        }

        // Create order with pending status
        const order = await Order.create({
            ...body,
            status: 'pending',
        });

        // TODO: Send confirmation email to customer
        // TODO: Send notification to admin

        return NextResponse.json(
            {
                success: true,
                data: order,
                message: 'Order placed successfully',
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to create order',
            },
            { status: 500 }
        );
    }
}
