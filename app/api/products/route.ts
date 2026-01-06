import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET all products
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = { availability: true };

        if (category && category !== 'all') {
            query = { ...query, category } as any;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: products,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch products',
            },
            { status: 500 }
        );
    }
}

// POST create new product (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const product = await Product.create(body);

        return NextResponse.json(
            {
                success: true,
                data: product,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to create product',
            },
            { status: 500 }
        );
    }
}
