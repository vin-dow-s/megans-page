// Styles
import '../globals.css'

// Components
import { Footer } from '@/components/blog/Footer'
import { Header } from '@/components/blog/Header'

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
