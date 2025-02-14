import Link from 'next/link'
import { auth } from '../../../auth'

export const Header = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    const isAdmin = userEmail === process.env.AUTH_ADMIN_EMAIL

    return (
        <header className="my-4 flex items-center rounded-sm bg-(--color-main-purple) p-4 shadow-xs sm:p-8">
            <nav className="flex w-full items-center">
                <Link href="/" className="bg-transparent">
                    <h1 className="signature text-3xl max-[370px]:text-2xl sm:text-4xl">
                        Megan's Page
                    </h1>
                </Link>
                <div className="ml-auto flex gap-2">
                    {isAdmin && (
                        <Link
                            href="/admin/posts"
                            className="main-link max-md:border max-md:border-(--color-strong-purple) max-md:bg-(--color-main-purple) max-md:p-2 max-md:px-4 max-sm:absolute max-sm:top-[100px] max-sm:right-[32px]"
                        >
                            Admin
                        </Link>
                    )}
                    <Link
                        href="/contact"
                        className="main-link max-md:border max-md:border-(--color-strong-purple) max-md:bg-white max-md:p-2 max-md:px-4"
                    >
                        Contact me
                    </Link>
                </div>
            </nav>
        </header>
    )
}
