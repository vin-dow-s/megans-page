import { getCategories } from '@/lib/categories'
import { getPublishedPosts } from '@/lib/posts'
import HomeClient from '@/components/blog/HomeClient'

const Home = async () => {
    const [postsResult, categoriesResult] = await Promise.all([
        getPublishedPosts(),
        getCategories(),
    ])

    if (!postsResult || !categoriesResult) {
        return (
            <section className="mx-4 rounded-lg border px-4">
                <h2 className="text-lg font-bold">Failed to load data</h2>
            </section>
        )
    }

    const posts = postsResult.data || []
    const categories = categoriesResult || []

    return <HomeClient posts={posts} categories={categories} />
}

export default Home
