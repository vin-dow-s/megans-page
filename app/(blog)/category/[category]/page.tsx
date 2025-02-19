// Packages
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Types
import { Category } from '@/lib/types'

// Actions
import { getCategoriesWithPublishedPosts } from '@/lib/categories'
import { getPublishedPostsByCategory } from '@/lib/posts'

// Components
import CategoriesList from '@/components/blog/CategoriesList'
import PostsGrid from '@/components/blog/PostsGrid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const generateStaticParams = async () => {
    const categoriesResult = await getCategoriesWithPublishedPosts()
    const categories = categoriesResult?.data || []

    return categories.map((category) => ({
        category: category.name.toLowerCase().replace(/\s+/g, '-'),
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

    if (!posts) {
        return {
            title: `Category not found`,
            description: 'Sorry, this Category does not contain any posts.',
        }
    }

    return {
        title: `${category}`,
        description:
            posts.length > 0
                ? `Explore ${posts.length} posts about ${category}`
                : `No posts found for category: ${category}`,
        openGraph: {
            title: `Category: ${category}`,
            description:
                posts.length > 0
                    ? `Explore ${posts.length} posts about ${category}`
                    : `No posts found for category: ${category}`,
            url: `${SITE_URL}/category/${category}`,
            images:
                posts.length > 0
                    ? [
                          {
                              url:
                                  posts[0].thumbnail ??
                                  '/assets/default-thumbnail.avif',
                              width: 1200,
                              height: 630,
                              alt: `Category: ${category}`,
                          },
                      ]
                    : [],
        },
    }
}

const FilteredPostsPage = async ({
    params,
}: {
    params: Promise<{ category: string }>
}) => {
    const { category } = await params
    const decodedCategory = category.replace(/-/g, ' ')

    const [categoriesResult, filteredPostsResult] = await Promise.all([
        getCategoriesWithPublishedPosts(),
        getPublishedPostsByCategory(decodedCategory),
    ])

    const categories = categoriesResult?.data
    const posts = filteredPostsResult?.data

    if (!categories || categories.length === 0 || !posts) return notFound()

    const currentCategory = categories?.find(
        (cat: Category) =>
            cat.name.toLowerCase() === decodedCategory.toLowerCase(),
    )

    return (
        <>
            <CategoriesList
                categories={categories}
                currentCategory={currentCategory}
            />
            <PostsGrid posts={posts} currentCategory={currentCategory} />
        </>
    )
}

export default FilteredPostsPage
