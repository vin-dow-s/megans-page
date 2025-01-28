'use client'

const ErrorPage = ({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-4xl font-bold">{error.message}</h2>
            <p className="mt-2">
                <button
                    className="cursor-pointer hover:underline"
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </p>
        </div>
    )
}

export default ErrorPage
