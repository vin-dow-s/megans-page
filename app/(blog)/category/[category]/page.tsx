// Packages
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Types
import { Category } from '@/lib/types'

// Actions
import { getCategories } from '@/lib/categories'
import { getPublishedPostsByCategory } from '@/lib/posts'

// Components
import HomeClient from '@/components/blog/HomeClient'

type Props = {
    params: Promise<{ category: string }>
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const { category } = await params
    const postResult = await getPublishedPostsByCategory(category)

    const posts = postResult?.data

    return {
        title: `Posts filtered by category: ${category}`,
        description: posts?.map((post) => post.title).join(', '),
    }
}

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

    if (!categories || !posts) {
        return notFound()
    }

    const currentCategory = categories?.find(
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
