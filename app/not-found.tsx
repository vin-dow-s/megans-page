import Link from 'next/link'

export default async function RoutePage() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-4xl font-bold text-destructive">
                404 - Page Not Found
            </h1>
            <p className="mt-2">
                Return{' '}
                <Link href="/" className="text-primary hover:underline">
                    Home
                </Link>
            </p>
        </div>
    )
}
