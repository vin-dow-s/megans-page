import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const UnauthorizedPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Unauthorized Access</h1>
            <p className="my-4 text-gray-600">
                You are not allowed to access this page.
            </p>
            <Link href="/" className={buttonVariants({ variant: 'outline' })}>
                Go Back to the Home Page
            </Link>
        </div>
    )
}

export default UnauthorizedPage
