import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-static'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const metadata = {
    title: 'Privacy Policy',
    description:
        "This Privacy Policy outlines how we collect, use, and protect your personal information when you visit Megan's Page.",
    openGraph: {
        title: 'Contact',
        description: 'Feel free to send me a message!',
        url: `${SITE_URL}/privacy-policy`,
        type: 'website',
        images: [
            {
                url: '/assets/default-homepage.avif',
                width: 1200,
                height: 630,
                alt: 'Privacy Policy',
            },
            {
                url: '/assets/default-homepage.webp',
                width: 1200,
                height: 630,
                alt: 'Privacy Policy',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy',
        description:
            "This Privacy Policy outlines how we collect, use, and protect your personal information when you visit Megan's Page.",
        images: [
            '/assets/default-homepage.avif',
            '/assets/default-homepage.webp',
        ],
    },
    robots: 'noindex, nofollow',
}

const PrivacyPolicyPage = () => {
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
                <h1 className="font-inherit mb-12 text-4xl">Privacy Policy</h1>
                <div className="flex flex-col gap-8">
                    <p className="font-medium">Last updated: 12/02/2025</p>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">1. Introduction</h2>
                        <p>
                            Welcome to Megan's Page. This Privacy Policy
                            explains what data we collect, how we use it, and
                            your rights regarding your information.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            2. Information We Collect
                        </h2>
                        <p>
                            When you submit a message through our contact form,
                            we collect:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>
                                - <strong>Name:</strong> Your name as provided
                                in the form.
                            </li>
                            <li>
                                - <strong>Email Address:</strong> Your email so
                                we can respond.
                            </li>
                            <li>
                                - <strong>Message Content:</strong> The details
                                of your inquiry.
                            </li>
                        </ul>
                        <p>
                            We do not collect additional personal information
                            unless you voluntarily provide it.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            3. How We Use Your Information
                        </h2>
                        <p>
                            We use the information collected through the contact
                            form to:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>
                                - <strong>Respond to inquiries:</strong> We use
                                your provided details to reply to your messages.
                            </li>
                            <li>
                                - <strong>Improve our services:</strong>{' '}
                                Feedback may be used to enhance our website and
                                content.
                            </li>
                        </ul>
                        <p>
                            We do <strong>not</strong> use your data for
                            marketing purposes or unsolicited emails.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            4. Sharing Your Information
                        </h2>
                        <p>
                            We do not sell, trade, or rent your personal
                            information to others.
                        </p>
                        <p>
                            We may share your information with third-party
                            service providers only to help us operate our
                            website.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">5. Data Security</h2>
                        <p>
                            We take reasonable measures to protect the personal
                            information submitted through our website.
                        </p>
                        <p>However, please note:</p>
                        <ul className="list-disc pl-5">
                            <li>
                                - No method of data transmission over the
                                Internet is 100% secure.
                            </li>
                            <li>
                                - We do <strong>not</strong> store contact form
                                data in our database or website.
                            </li>
                            <li>
                                - If you have security concerns, you may contact
                                us directly via email.
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            6. Your Privacy Rights
                        </h2>
                        <p>
                            Depending on your location, you may have certain
                            rights regarding your personal information, such as
                            the right to access, update, or delete your
                            information.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            7. Cookies & Tracking
                        </h2>
                        <p>
                            We do <strong>not</strong> use cookies, analytics,
                            or tracking tools to collect personal data.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            8. Changes to This Privacy Policy
                        </h2>
                        <p>
                            This policy may be updated periodically. Any changes
                            will be posted on this page and reflected in the
                            "last updated" date.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">9. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy,
                            you can contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong>{' '}
                            <a
                                href="mailto:contact.meganspage@gmail.com"
                                className="font-medium underline"
                            >
                                contact.meganspage@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PrivacyPolicyPage
