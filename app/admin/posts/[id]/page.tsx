// Packages
import { notFound } from 'next/navigation'

// Actions
import { getPostById } from '@/lib/posts'

// Components
import PostOverviewPage from '@/components/admin/posts/PostOverviewPage'

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const postId = Number(id)
    const postResult = await getPostById(postId)

    const post = postResult?.data

    if (!post) notFound()

    return <PostOverviewPage post={post} />
}

export default PostPage
