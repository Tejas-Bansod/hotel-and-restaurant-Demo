import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect admin routes (except login)
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Protect API routes that require authentication
    if (path.startsWith('/api/orders') && request.method !== 'POST') {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
    }

    if (
        (path.startsWith('/api/products') && request.method !== 'GET') ||
        path.startsWith('/api/admin')
    ) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
