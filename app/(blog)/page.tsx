// Actions
import { getCategories } from '@/lib/categories'
import { getPublishedPosts } from '@/lib/posts'

// Components
import HomeClient from '@/components/blog/HomeClient'

const Home = async () => {
    // TODO: static-site generation
    // TODO: components in app/
    // TODO: GET in app/routes
    const [postsResult, categoriesResult] = await Promise.all([
        getPublishedPosts(),
        getCategories(),
    ])

    const posts = postsResult?.data
    const categories = categoriesResult?.data

    if (!posts || !categories) {
        return (
            <section className="mx-4 rounded-lg border px-4">
                <h2 className="text-lg font-bold">Failed to load data</h2>
            </section>
        )
    }

    return <HomeClient posts={posts} categories={categories} />
}

export const revalidate = 3600

export default Home
