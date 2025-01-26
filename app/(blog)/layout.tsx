// Styles
import '../globals.css'

// Components
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'

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
