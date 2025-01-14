import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import '../globals.css'

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="grow">
                <SidebarTrigger className="m-4 p-4" />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default AdminLayout
