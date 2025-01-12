export default async function RoutePage() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-4xl font-bold text-destructive">
                404 - Page Not Found
            </h1>
            <p className="mt-2">
                Return{' '}
                <a href="/blog" className="text-primary hover:underline">
                    Home
                </a>
            </p>
        </div>
    )
}
