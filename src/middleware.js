    import { NextResponse } from "next/server";

    export function middleware(request){
        console.log('running')

        if(true){
            return NextResponse.redirect( new URL('/login', request.url))
        }

        return NextResponse.next();

    }

    export const config = {
        matcher : ['/', 
                    '/blog', 
                    '/profile', 
                    '/about', 
                    '/contact', 
                    '/settings', 
                    '/products', 
                    '/posts/:path*',
                    '/profile/:path*']
    }