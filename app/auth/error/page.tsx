import Link from 'next/link'

const UnauthorizedPage = () => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Unauthorized Access</h1>
            <p className="mt-4 mb-8 text-gray-600">
                You are not allowed to access this page.
            </p>
            <Link href="/" className="main-link">
                Go Back to the Home Page
            </Link>
        </section>
    )
}

export default UnauthorizedPage
