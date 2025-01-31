// Styles
import '../globals.css'

// Components
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Metadata } from 'next'
import { AdminSidebar } from './_components/AdminSidebar'

export const metadata: Metadata = {
    title: 'Admin Dashboard | Blog Test',
    robots: 'noindex, nofollow',
}

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="mb-4 grow">
                <SidebarTrigger className="m-4 p-4" />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default AdminLayout
