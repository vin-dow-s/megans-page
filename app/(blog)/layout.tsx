// Styles
import { Metadata } from 'next'
import '../globals.css'

// Components
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
    title: {
        default: 'Blog Test',
        template: `%s | Blog Test`,
    },
    description: 'Discover high-quality posts about X.',
    openGraph: {
        title: 'Blog Test - X',
        description: 'Discover high-quality posts about X.',
        url: SITE_URL,
        type: 'website',
        images: [
            {
                url: `${SITE_URL}/default-thumbnail.jpg`,
                width: 1200,
                height: 630,
                alt: 'Blog Test - X',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog Test - X',
        description: 'Discover high-quality posts about X.',
        images: [`${SITE_URL}/default-thumbnail.jpg`],
    },
}

const BlogLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className="text-foreground mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-transparent px-4 antialiased">
            <Header />
            <main className="mx-auto my-8 w-full grow">{children}</main>{' '}
            <Footer />
        </div>
    )
}

export default BlogLayout
