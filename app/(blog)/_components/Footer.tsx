import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="m-4 flex items-center rounded-lg border p-4">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} My Blog. All rights
                    reserved.
                </p>
                <nav aria-label="Footer navigation" className="mt-2">
                    <Link href="/">Privacy Policy</Link>{' '}
                </nav>
            </div>
        </footer>
    )
}

export default Footer
