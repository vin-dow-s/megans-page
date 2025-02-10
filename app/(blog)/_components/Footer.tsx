import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="mt-4 flex items-center rounded-sm p-2">
            <div className="container mx-auto text-center text-xs">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <nav aria-label="Footer navigation">
                    <Link
                        href="/"
                        className="border-none bg-transparent bg-none font-normal hover:underline"
                    >
                        Privacy Policy
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
