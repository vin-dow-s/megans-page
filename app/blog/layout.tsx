import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const BlogLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <>
            <Header />
            <main className="grow px-4">{children}</main>
            <Footer />
        </>
    )
}

export default BlogLayout
