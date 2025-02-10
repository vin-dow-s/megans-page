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
        <section className="mx-4 rounded-lg border border-(--color-main-purple) bg-white px-4">
            <nav className="flex items-center justify-between p-6 px-2 pb-12">
                <h2 className="text-lg font-bold text-(--color-dark-accent)">
                    Posts
                </h2>
                <Link
                    href="/admin/posts/create"
                    className="rounded-sm bg-(--color-main-purple) p-2 text-(--color-dark-accent)"
                >
                    Create a Post
                </Link>
            </nav>
            <PostsTable posts={posts} />
        </section>
    )
}

export default PostsGrid
