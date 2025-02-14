// Packages
import Link from 'next/link'

// Actions
import { getPosts } from '@/lib/posts'

// Components
import PostsTable from '@/components/admin/posts/PostsTable'

const PostsGrid = async () => {
    const postsResult = await getPosts()

    if (!postsResult) throw new Error('Failed to load posts.')

    const posts = postsResult?.data || []

    return (
        <section className="mx-4 rounded-sm border-none bg-white p-6 shadow-xs">
            <nav className="mb-12 flex items-center justify-between">
                <h2 className="text-4xl font-medium">Posts</h2>
                <Link
                    href="/admin/posts/create"
                    className="main-button shadow-xs"
                >
                    Create a Post
                </Link>
            </nav>
            <PostsTable posts={posts} />
        </section>
    )
}

export default PostsGrid
