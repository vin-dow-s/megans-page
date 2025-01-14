import PostsTable from '@/components/admin/posts/PostsTable'
import { Button } from '@/components/ui/button'
import { getPosts } from '@/lib/posts'
import Link from 'next/link'

const PostsPage = async () => {
    const postsResult = await getPosts()

    if (!postsResult) {
        return (
            <section className="mx-4 rounded-lg border px-4">
                <h2 className="text-lg font-bold">Failed to load posts</h2>
            </section>
        )
    }

    const posts = postsResult?.data || []

    return (
        <section className="mx-4 rounded-lg border px-4">
            <nav className="flex items-center justify-between p-8 px-2 pb-12">
                <h2 className="text-lg font-bold">Posts</h2>
                <Button asChild>
                    <Link href="/admin/posts/create">Create a Post</Link>
                </Button>
            </nav>
            <PostsTable posts={posts} />
        </section>
    )
}

export default PostsPage
