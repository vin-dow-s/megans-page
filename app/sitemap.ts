// app/sitemap.ts
import { getCategories } from '@/lib/categories'
import { getPublishedPosts } from '@/lib/posts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch dynamic data (posts and categories)
    const postsResult = await getPublishedPosts()
    const categoriesResult = await getCategories()

    const posts = postsResult?.data || []
    const categories = categoriesResult?.data || []

    // Construct sitemap entries for static pages
    const staticRoutes = [
        {
            url: 'https://yourdomain.com/',
            lastModified: new Date().toISOString(),
        },
        {
            url: 'https://yourdomain.com/about',
            lastModified: new Date().toISOString(),
        },
    ]

    // Construct sitemap entries for dynamic posts
    const postRoutes = posts.map((post) => ({
        url: `https://yourdomain.com/${post.slug}`,
        lastModified: post.publishedAt || new Date().toISOString(),
    }))

    // Construct sitemap entries for dynamic categories
    const categoryRoutes = categories.map((category) => ({
        url: `https://yourdomain.com/category/${category.name.toLowerCase()}`,
        lastModified: new Date().toISOString(),
    }))

    // Combine all routes
    return [...staticRoutes, ...postRoutes, ...categoryRoutes]
}
