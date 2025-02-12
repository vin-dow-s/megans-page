import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const TermsOfUsePage = () => {
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
                <h1 className="font-inherit mb-12 text-4xl">Terms of Use</h1>
                <div className="flex flex-col gap-8">
                    <p className="font-medium">Last updated: 12/02/2025</p>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using Megan's Page (the “Website”),
                            you agree to these Terms of Use. If you do not
                            agree, please do not use this Website.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            2. Intellectual Property Rights{' '}
                        </h2>
                        <ul className="list-disc pl-5">
                            <li>
                                All blog posts, articles, images, and other
                                content published on this Website are owned by
                                Megan's Page and protected by copyright laws.
                            </li>
                            <li>
                                You may not reproduce, distribute, modify, or
                                use content without permission.
                            </li>
                            <li>
                                You may share excerpts with proper credit and a
                                link to the original post.
                            </li>
                        </ul>
                        <p>
                            We do not collect additional personal information
                            unless you voluntarily provide it.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            3. Acceptable Use{' '}
                        </h2>
                        <p>When using this Website, you agree to:</p>
                        <ul className="list-disc pl-5">
                            <li>Use it lawfully and respectfully.</li>
                            <li>
                                Not post spam, offensive, or harmful content.
                            </li>
                            <li>
                                Not attempt to hack, disrupt, or misuse the
                                Website{' '}
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            4. Third-Party Services{' '}
                        </h2>
                        <p>
                            We use third-party services to enhance our Website:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>
                                <strong>Resend</strong>: Sends contact form
                                submissions via email.
                            </li>
                            <li>
                                <strong>Google reCAPTCHA v3</strong>: Protects
                                the contact form from spam.
                            </li>
                        </ul>
                        <p>
                            We are not responsible for any issues caused by
                            these third-party services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            5. Disclaimer of Liability
                        </h2>
                        <p>
                            The Website is provided "as is" without guarantees.
                        </p>
                        <p>
                            While we strive for accuracy, we are not responsible
                            for outdated or incorrect information. We are not
                            liable for damages caused by using this Website.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">6. Privacy Policy</h2>
                        <p>
                            Please refer to our Privacy Policy for details on
                            how we collect and process personal data.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            7. Changes to These Terms
                        </h2>
                        <p>
                            We may update these Terms occasionally. Continued
                            use of the Website means you accept any changes.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">
                            8. Contact Information{' '}
                        </h2>
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

export default TermsOfUsePage
