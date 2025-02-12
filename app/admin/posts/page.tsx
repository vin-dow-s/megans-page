// Packages
import Link from 'next/link'

// Actions
import { getPosts } from '@/lib/posts'

// Components
import PostsTable from './_components/PostsTable'

const PostsGrid = async () => {
    const postsResult = await getPosts()

    if (!postsResult) throw new Error('Failed to load posts.')

    const posts = postsResult?.data || []

    return (
        <section className="mx-4 rounded-sm border-none bg-white px-4 shadow-xs">
            <nav className="flex items-center justify-between p-6 px-2 pb-12">
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
