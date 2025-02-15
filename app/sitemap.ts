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
    const staticRoutes = ['', '/contact'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
    }))

    // Dynamic post pages
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: post.publishedAt || new Date().toISOString(),
    }))

    // Dynamic category pages
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/category/${category.name.toLowerCase()}`,
        lastModified: new Date().toISOString(),
    }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes]
}
