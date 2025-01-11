import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/src/lib/utils'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Blog Test',
    description: 'This is a Blog Test',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en" className="h-full">
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`,
                )}
            >
                {children}
            </body>
        </html>
    )
}

export default RootLayout
