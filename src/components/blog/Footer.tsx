import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="mt-4 flex items-center rounded-sm">
            <div className="container mx-auto text-center text-sm">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} Megan's Page.{' '}
                    <a
                        href="mailto:contact@vindows.dev"
                        className="border-none bg-transparent bg-none font-normal hover:underline"
                    >
                        Developed by Vincent S.
                    </a>
                </p>
                <nav aria-label="Footer navigation">
                    <div className="flex items-center justify-center gap-6 text-xs">
                        <Link
                            href="/privacy-policy"
                            className="border-none bg-transparent bg-none p-2 font-light hover:underline"
                        >
                            Privacy Policy
                        </Link>{' '}
                        <Link
                            href="/terms"
                            className="border-none bg-transparent bg-none p-2 font-light hover:underline"
                        >
                            Terms of Use
                        </Link>
                    </div>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
