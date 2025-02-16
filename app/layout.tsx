import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
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
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#ddd9ff" />

                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/favicon.ico" />
            </head>
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    )
}

export default RootLayout
