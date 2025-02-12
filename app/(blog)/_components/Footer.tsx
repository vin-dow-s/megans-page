import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="mt-4 flex items-center rounded-sm p-2">
            <div className="container mx-auto text-center text-xs">
                <p>
                    &copy; {new Date().getFullYear()} Megan's Page. All rights
                    reserved.
                </p>
                <nav aria-label="Footer navigation">
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/privacy-policy"
                            className="border-none bg-transparent bg-none font-normal hover:underline"
                        >
                            Privacy Policy
                        </Link>{' '}
                        -
                        <Link
                            href="/terms"
                            className="border-none bg-transparent bg-none font-normal hover:underline"
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
