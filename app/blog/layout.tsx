import '../globals.css'
import { Header } from '@/components/blog/Header'
import { Footer } from '@/components/blog/Footer'

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
