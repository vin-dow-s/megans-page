'use client'

// Packages
import Link from 'next/link'

// Components
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

// Icons
import clsx from 'clsx'
import { Home, LogOut, Newspaper, Tag } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const SIDEBAR_ITEMS = [
    {
        title: 'Posts',
        url: '/admin/posts',
        icon: Newspaper,
    },
    {
        title: 'Categories',
        url: '/admin/categories',
        icon: Tag,
    },
]

export const AdminSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin panel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SIDEBAR_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="py-6">
                                        <Link
                                            href={item.url}
                                            className={clsx(
                                                pathname === item.url &&
                                                    'bg-gray-100 text-black',
                                            )}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {/* Back to Blog */}
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="py-6">
                        <Link href="/">
                            <Home />
                            <span>Back to Blog</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Sign Out Button */}
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="cursor-pointer py-6 text-red-600 hover:text-red-700"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        <LogOut />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    )
}
