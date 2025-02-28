import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // If no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Optional: Validate the token with the backend
  // You cannot use await here, but you can perform a synchronous check if needed
  // For example, you could check the token format or expiration if applicable

  // If you need to validate the token, consider doing it in a separate function
  // and call it in your API routes instead of middleware.

  return NextResponse.next();
}

// Define routes to protect
export const config = {
  matcher: '/(dashboard)/:path*', // Protect all routes under /dashboard
};