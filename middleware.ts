import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import authConfig from './auth.config'
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_ADMIN_REDIRECT,
    publicRoutes,
} from './routes.config'

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const pathname = nextUrl.pathname

    const isPublicRoute = publicRoutes.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)
    const isAdminRoute = pathname.startsWith('/admin')
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)

    // Skip middleware for API auth routes
    if (isApiAuthRoute) return NextResponse.next()

    // Prevent logged-in users from accessing sign-in pages
    if (isAuthRoute && isLoggedIn)
        return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))

    // Redirect non-logged-in users away from protected pages
    if (!isPublicRoute && !isLoggedIn)
        return NextResponse.redirect(new URL('/auth/sign-in', nextUrl))

    // Admin access restriction
    if (isAdminRoute && !isLoggedIn)
        return NextResponse.redirect(new URL('/auth/sign-in', nextUrl))

    return NextResponse.next()
})

export const config = {
    matcher: ['/admin/(.*)', '/api/(.*)', '/auth/(.*)'],
}
