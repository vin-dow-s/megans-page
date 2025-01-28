// Packages
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Types
import { Category } from '@/lib/types'

// Actions
import { getCategories } from '@/lib/categories'
import { getPublishedPostsByCategory } from '@/lib/posts'

// Components
import CategoriesList from '../../_components/CategoriesList'
import PostsGrid from '../../_components/PostsGrid'

// Generate static params for all categories
export async function generateStaticParams() {
    const categoriesResult = await getCategories()
    const categories = categoriesResult?.data || []

    return categories.map((category) => ({
        category: category.name.toLowerCase(),
    }))
}

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

    if (!categories || categories.length === 0 || !posts) return notFound()

    const currentCategory = categories?.find(
        (cat: Category) => cat.name.toLowerCase() === category.toLowerCase(),
    )

    return (
        <>
            <CategoriesList
                categories={categories}
                currentCategory={currentCategory}
            />
            <PostsGrid posts={posts} />
        </>
    )
}

export const revalidate = 3600

export default FilteredPostsPage
