import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;
  
//   // Debug headers
//   const response = NextResponse.next();
//   response.headers.set('x-debug-token', token || 'missing');
//   response.headers.set('x-debug-cookies', request.headers.get('cookie') || 'none');

//   console.log({
//     token,
//     cookies: request.headers.get('cookie'),
//     url: request.url
//   });

//   // Check if the route is within the protected dashboard routes
//   if (request.nextUrl.pathname.startsWith('/dash') && !token) {
//     // Use the full URL including protocol and host for the redirect
//     return NextResponse.redirect(new URL('/signin', request.url));
//   }

//   return response;
// }

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Allow access to static files
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // Redirect logic
  if (!token && request.nextUrl.pathname.startsWith('/dash')) {
    const loginUrl = new URL('/signin', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/dash', '/dashboard/:path*'],
  experimental: {
    serverActions: {
      allowedOrigins: ['server-production-2ee7.up.railway.app','localhost:3000']
    }
  }
};