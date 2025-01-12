'use client'

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-6 w-3/4 rounded bg-gray-300"></div>
            <div className="mt-2 h-6 w-1/2 rounded bg-gray-300"></div>
            <div className="mt-4 h-48 rounded bg-gray-300"></div>
        </div>
    )
}
