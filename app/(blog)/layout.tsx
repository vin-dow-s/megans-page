// Styles
import { Metadata } from 'next'
import '../globals.css'

// Components
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
    title: {
        default: `Megan's Page`,
        template: `%s  • Megan's Page`,
    },
    description: '',
    openGraph: {
        title: `Megan's Page - X`,
        description: '',
        url: SITE_URL,
        type: 'website',
        images: [
            {
                url: `${SITE_URL}/default-homepage.png`,
                width: 1200,
                height: 630,
                alt: `Megan's Page - X`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Megan's Page - X`,
        description: '',
        images: [`${SITE_URL}/default-homepage.png`],
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
            <main className="mx-auto my-8 flex w-full grow flex-col">
                {children}
            </main>{' '}
            <Footer />
        </div>
    )
}

export default BlogLayout
