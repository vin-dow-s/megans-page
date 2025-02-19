// app/sitemap.ts
import { getCategories } from '@/lib/categories'
import { getPublishedPosts } from '@/lib/posts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

    // Fetch published posts and categories
    const [postsResult, categoriesResult] = await Promise.all([
        getPublishedPosts(),
        getCategories(),
    ])

    const posts = postsResult?.data || []
    const categories = categoriesResult?.data || []

    // Static pages
    const latestUpdate =
        posts.length > 0
            ? new Date(
                  Math.max(
                      ...posts.map((post) =>
                          new Date(post.updatedAt).getTime(),
                      ),
                  ),
              ).toISOString()
            : new Date().toISOString()

    const staticRoutes = [
        { url: `${baseUrl}/`, lastModified: latestUpdate },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date('2025-02-12').toISOString(),
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date('2025-02-12').toISOString(),
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date('2025-02-12').toISOString(),
        },
    ]

    // Dynamic post pages
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: post.updatedAt
            ? new Date(post.updatedAt).toISOString()
            : new Date().toISOString(),
    }))

    // Dynamic category pages
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/category/${encodeURIComponent(category.name.toLowerCase())}`,
        lastModified: new Date().toISOString(),
    }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes]
}
