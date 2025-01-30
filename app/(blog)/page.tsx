// Actions
import { getCategories } from '@/lib/categories'
import { getPublishedPosts } from '@/lib/posts'

// Components
import CategoriesList from './_components/CategoriesList'
import PostsGrid from './_components/PostsGrid'

const Home = async () => {
    // TODO: check static-site generation
    // TODO: granular streaming and suspense
    // ? Search input
    // ? Pagination
    // ? Stats and charts analytics dashboard

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

    return (
        <>
            <CategoriesList categories={categories} />
            <PostsGrid posts={posts} />
        </>
    )
}

export const revalidate = 3600

export default Home
