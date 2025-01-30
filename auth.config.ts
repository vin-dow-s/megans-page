import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            // Only allow sign in for the admin user
            if (user.email !== process.env.AUTH_ADMIN_EMAIL) return false

            return true
        },
    },
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/',
        error: '/auth/error',
    },
} satisfies NextAuthConfig
