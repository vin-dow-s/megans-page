'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const SignInPage = () => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <Button
                onClick={() => signIn('google')}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
                Sign in with Google
            </Button>
            <p className="mt-2">
                <Link href="/" className="text-primary hover:underline">
                    Return Home
                </Link>
            </p>
        </section>
    )
}

export default SignInPage
