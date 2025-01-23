// Styles
import '../globals.css'

// Components
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

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
