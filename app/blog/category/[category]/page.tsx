import HomeClient from '@/components/blog/HomeClient'
import { getCategories } from '@/lib/categories'
import { getPublishedPostsByCategory } from '@/lib/posts'
import { notFound } from 'next/navigation'

const FilteredPostsPage = async ({
    params,
}: {
    params: Promise<{ category: string }>
}) => {
    const { category } = await params

    const [categoriesResult, filteredPostsResult] = await Promise.all([
        getCategories(),
        getPublishedPostsByCategory(category),
    ])

    if (!categoriesResult || !filteredPostsResult) {
        return notFound()
    }

    const categories = categoriesResult || []
    const posts = filteredPostsResult.data || []

    const currentCategory = categories.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase(),
    )

    return (
        <HomeClient
            posts={posts}
            categories={categories}
            currentCategory={currentCategory}
        />
    )
}

export default FilteredPostsPage
