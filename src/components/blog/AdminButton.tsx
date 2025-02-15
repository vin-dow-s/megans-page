import Link from 'next/link'
import { auth } from '../../../auth'

export const AdminButton = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    const isAdmin = userEmail === process.env.AUTH_ADMIN_EMAIL

    if (!isAdmin) return null

    return (
        <Link
            href="/admin/posts"
            className="main-link max-md:border max-md:border-(--color-strong-purple) max-md:bg-(--color-main-purple) max-md:p-2 max-md:px-4 max-sm:absolute max-sm:top-[100px] max-sm:right-[32px]"
        >
            Admin
        </Link>
    )
}
