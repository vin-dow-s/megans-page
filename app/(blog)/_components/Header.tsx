import Link from 'next/link'
import { auth } from '../../../auth'
import { buttonVariants } from '../../../src/components/ui/button'

export const Header = async () => {
    const session = await auth()

    return (
        <header className="m-4 flex items-center rounded-lg border p-4">
            <nav className="flex w-full items-center">
                <Link href="/" className="font-mono">
                    <span className="sr-only">Blog Test Home</span>{' '}
                    <h1>Blog Test</h1>{' '}
                </Link>
                <div className="ml-auto flex gap-2">
                    {session && (
                        <Link
                            className={buttonVariants({
                                variant: 'destructive',
                            })}
                            href="/admin/posts"
                        >
                            Admin
                        </Link>
                    )}
                    <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href="/contact"
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    )
}
