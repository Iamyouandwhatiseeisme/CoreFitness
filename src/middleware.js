import { NextResponse } from "next/server";
    export function middleware(request){
        const accessToken = request.cookies.get('accessToken');
        console.log(request.url, accessToken)
        
        const currentPath = request.nextUrl.pathname;
        if(!accessToken && currentPath !== '/login'){
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next();
}

export const config = {
        matcher : [ 
                    "/:path*"
                    // '/',
                    // '/blog', 
                    // '/profile', 
                    // '/about', 
                    // '/contact', 
                    // '/settings', 
                    // '/products', 
                    // '/posts/:path*',
                    // '/profile/:path*', 
                    
                ]
    }