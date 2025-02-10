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
        <Sidebar className="border-none">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-400">
                        Admin panel
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SIDEBAR_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className="rounded-sm py-6"
                                    >
                                        <Link
                                            href={item.url}
                                            className={clsx(
                                                pathname.includes(item.url)
                                                    ? 'border-none bg-[#DDD9FF] text-(--color-dark-accent)'
                                                    : 'text-(--color-dark-accent) hover:bg-[#F1EFFF]',
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
                        <Link
                            href="/"
                            className="text-(--color-dark-accent) hover:bg-[#F1EFFF]"
                        >
                            <Home />
                            <span>Back to Blog</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Sign Out Button */}
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="cursor-pointer bg-(--color-light-accent) py-6 text-red-700 hover:bg-red-100"
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
