import HomeClient from '@/components/blog/HomeClient'
import { getCategories } from '@/lib/categories'
import { getPublishedPostsByCategory } from '@/lib/posts'
import { Category } from '@/lib/types'
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

    const categories = categoriesResult?.data
    const posts = filteredPostsResult?.data

    if (!categoriesResult || !filteredPostsResult) {
        return notFound()
    }

    const currentCategory = categories.find(
        (cat: Category) => cat.name.toLowerCase() === category.toLowerCase(),
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
