import Link from 'next/link'

export default async function RoutePage() {
    return (
        <section className="flex flex-col items-center justify-center">
            <h1 className="mt-8 mb-4 text-4xl font-bold">
                404 - Page Not Found
            </h1>
            <Link href="/" className="main-link">
                Go Back to the Home Page
            </Link>
        </section>
    )
}
