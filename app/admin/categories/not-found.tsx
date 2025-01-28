import Link from 'next/link'

export default async function RoutePage() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4">
                <Link
                    href="/admin/categories"
                    className="text-primary hover:underline"
                >
                    Return to Categories
                </Link>
            </p>
        </div>
    )
}
