import Link from 'next/link'
import Footer from './(blog)/_components/Footer'
import { Header } from './(blog)/_components/Header'

export default async function RoutePage() {
    return (
        <div className="text-foreground mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-transparent px-4 antialiased">
            <Header />
            <main className="mx-auto my-8 flex w-full grow flex-col">
                <section className="flex flex-col items-center justify-center">
                    <h1 className="mt-8 mb-4 text-4xl font-bold">
                        404 - Page Not Found
                    </h1>
                    <Link href="/" className="main-link">
                        Go Back to the Home Page
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    )
}
