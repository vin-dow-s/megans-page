import Link from 'next/link'
import { auth } from '../../../auth'

export const Header = async () => {
    const session = await auth()

    return (
        <header className="my-4 flex items-center rounded-sm bg-(--color-main-purple) p-8">
            <nav className="flex w-full items-center">
                <Link href="/" className="bg-transparent">
                    <h1 className="signature text-2xl md:text-4xl">
                        Megan's Page
                    </h1>
                </Link>
                <div className="ml-auto flex gap-2">
                    {session && (
                        <Link
                            href="/admin/posts"
                            className="main-button max-md:text-sm"
                        >
                            Admin
                        </Link>
                    )}
                    <Link
                        href="/contact"
                        className="main-button max-md:text-sm"
                    >
                        Contact me
                    </Link>
                </div>
            </nav>
        </header>
    )
}
