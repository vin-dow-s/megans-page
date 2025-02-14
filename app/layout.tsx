import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { ebGaramond, greatVibes, jost } from '../public/fonts/fonts'
import './globals.css'

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html
            lang="en"
            className={cn(
                ebGaramond.variable,
                jost.variable,
                greatVibes.variable,
                'h-dvh',
            )}
        >
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/favicon.ico" />
            </head>
            <body>
                <ReCaptchaProvider
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                >
                    {children}
                    <Toaster />
                </ReCaptchaProvider>
            </body>
        </html>
    )
}

export default RootLayout
