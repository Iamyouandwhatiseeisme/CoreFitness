import { NextResponse } from "next/server";
    export function middleware(request){
        const refreshToken = request.cookies.get('refreshToken');
        console.log(request.url, refreshToken)
        if(!refreshToken){
            return NextResponse.redirect( new URL('/login', request.url))
        }
        return NextResponse.next();

}

export const config = {
        matcher : [ '/', 
                    '/blog', 
                    '/profile', 
                    '/about', 
                    '/contact', 
                    '/settings', 
                    '/products', 
                    '/posts/:path*',
                    '/profile/:path*']
    }