// src/app/api/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { verifyTokenWithIdP } from '../../../../lib/auth';

// If needed, modify setAuthCookie to work with NextResponse cookies.
// For demonstration, we'll set the cookie directly.
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const state = searchParams.get('state');

    if (!token) {
        return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    try {
        // Verify the token with the IdP
        console.log(token);
        const userData = await verifyTokenWithIdP(token as string);
        
        if (!userData) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        // Create a response and set the authentication cookie
        const response = NextResponse.redirect(new URL('/dashboard', request.url));
        response.cookies.set('auth', token, { httpOnly: true });

        return response;
    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}