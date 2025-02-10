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
                'h-full',
            )}
        >
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    )
}

export default RootLayout
