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
    const pathname = nextUrl.pathname

    const isLoggedIn = !!req.auth
    const userEmail = req.auth?.user?.email
    const isAdmin = userEmail === process.env.AUTH_ADMIN_EMAIL

    const isPublicRoute = publicRoutes.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)
    const isAdminRoute = pathname.startsWith('/admin')
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
    const isApiContactRoute = pathname.startsWith('/api/contact')

    if (isApiAuthRoute || isApiContactRoute) return NextResponse.next()

    // Allow access to sign-in page when user is not logged in
    if (isAuthRoute && !isLoggedIn) return NextResponse.next()

    // Prevent logged-in users from accessing sign-in page again
    if (isAuthRoute && isLoggedIn)
        return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))

    // Redirect non-logged-in users trying to access protected pages
    if (!isPublicRoute && !isLoggedIn)
        return NextResponse.redirect(new URL('/auth/sign-in', nextUrl))

    // Redirect logged-in but non-admin users away from admin pages
    if (isAdminRoute && isLoggedIn && !isAdmin)
        return NextResponse.redirect(new URL('/auth/error', nextUrl))

    return NextResponse.next()
})

export const config = {
    matcher: ['/admin/(.*)', '/api/(.*)', '/auth/(.*)'],
}
