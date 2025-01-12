import '../globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

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
