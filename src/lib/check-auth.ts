'use server'

import { redirect } from 'next/navigation'
import { auth } from '../../auth'

export const requireAdmin = async () => {
    const session = await auth()

    if (!session || session.user?.email !== process.env.AUTH_ADMIN_EMAIL)
        redirect('/auth/error')

    return session.user
}
