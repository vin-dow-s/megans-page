import { ContactForm } from '@/components/blog/ContactForm'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-static'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const metadata = {
    title: 'Contact',
    description: 'Feel free to send me a message!',
    openGraph: {
        title: 'Contact',
        description: 'Feel free to send me a message!',
        url: `${SITE_URL}/contact`,
        type: 'website',
        images: [
            {
                url: '/assets/default-homepage.avif',
                width: 1200,
                height: 630,
                alt: 'Contact',
            },
            {
                url: '/assets/default-homepage.webp',
                width: 1200,
                height: 630,
                alt: 'Contact',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact',
        description: 'Feel free to send me a message!',
        images: [
            '/assets/default-homepage.avif',
            '/assets/default-homepage.webp',
        ],
    },
}

const ContactPage = () => {
    return (
        <>
            <div className="mb-4 flex gap-10">
                <Link href={'/'} className="category-link">
                    <div className="flex items-center gap-1 font-normal">
                        <ArrowLeftIcon size={14} /> Back
                    </div>
                </Link>
            </div>
            <section className="flex flex-col items-center justify-center rounded-sm bg-white px-2 py-12 shadow-xs sm:px-12">
                <h1 className="font-inherit mb-12 text-4xl">Contact</h1>
                <ContactForm />
            </section>
        </>
    )
}

export default ContactPage
