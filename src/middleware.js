import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log("task Done", request);
    const authToken = request.cookies.get("authToken")?.value;
    console.log(authToken, "authToken");

    const pathname = request.nextUrl.pathname;

    
    
    // Allow API login requests to pass through
    if (pathname.startsWith('/api/login') || pathname.startsWith('/api/users')) return NextResponse.next();
    console.log("hge;llo")

    const isUserPathNotLoggedIn = pathname.startsWith('/login') || pathname.startsWith('/signup');
    console.log(isUserPathNotLoggedIn, "isUserPathNotLoggedIn");
    if (isUserPathNotLoggedIn) {
        if (authToken) {
            console.log("Redirecting logged-in user from login/signup to profile");
            // If user is logged in and tries to access login or signup, redirect to profile
            return NextResponse.redirect(new URL('/profile/user', request.url));
        }
    } else {
       
        if (!authToken && pathname.startsWith("/api")) {
            return NextResponse.json({
              message: "User is not authenticated",
              success: false,
            }, { status: 401 });
          }
        if (!authToken) {
            console.log("Redirecting unauthenticated user to login");
            // If user is not logged in and tries to access protected routes, redirect to login
            
            return NextResponse.redirect(new URL('/login', request.url));
        } else{
            console.log("reached here")
        }
    }

    // If no redirection is needed, proceed as normal
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/add-tasks', '/login', '/signup', '/profile/:path*', '/show-tasks', '/api/:path*'],
};
