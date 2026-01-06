import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET single product
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const product = await Product.findById(params.id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Product not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: product,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch product',
            },
            { status: 500 }
        );
    }
}

// PUT update product (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await request.json();

        const product = await Product.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Product not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: product,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to update product',
            },
            { status: 500 }
        );
    }
}

// DELETE product (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Product not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to delete product',
            },
            { status: 500 }
        );
    }
}
