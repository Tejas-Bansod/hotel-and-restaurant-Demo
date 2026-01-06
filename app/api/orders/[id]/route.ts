import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// GET single order
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const order = await Order.findById(params.id);

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch order',
            },
            { status: 500 }
        );
    }
}

// PUT update order status (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await request.json();

        const order = await Order.findByIdAndUpdate(
            params.id,
            { status: body.status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order not found',
                },
                { status: 404 }
            );
        }

        // TODO: Send status update email to customer

        return NextResponse.json({
            success: true,
            data: order,
            message: 'Order status updated successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to update order',
            },
            { status: 500 }
        );
    }
}
