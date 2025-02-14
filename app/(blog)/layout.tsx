// Styles
import { Metadata } from 'next'
import '../globals.css'

// Components
import { Footer } from '@/components/blog/Footer'
import { Header } from '@/components/blog/Header'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
    title: {
        default: `Megan's Page`,
        template: `%s • Megan's Page`,
    },
    description: 'Welcome to my blog!',
    openGraph: {
        title: `Megan's Page`,
        description: 'Welcome to my blog!',
        url: SITE_URL,
        type: 'website',
        images: [
            {
                url: `${SITE_URL}/assets/default-homepage.png`,
                width: 1200,
                height: 630,
                alt: `Megan's Page`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Megan's Page`,
        description: 'Welcome to my blog!',
        images: [`${SITE_URL}/icons/icon-512x512.png`],
    },
}

const BlogLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className="text-foreground mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col bg-transparent px-4 antialiased">
            <Header />
            <main className="mx-auto my-8 flex w-full grow flex-col">
                {children}
            </main>{' '}
            <Footer />
        </div>
    )
}

export default BlogLayout
