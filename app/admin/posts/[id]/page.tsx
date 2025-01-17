import PostOverviewPage from '@/components/admin/posts/PostOverviewPage'
import { getPostById } from '@/lib/posts'
import { notFound } from 'next/navigation'

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const postId = Number(id)
    const postResult = await getPostById(postId)

    const post = postResult?.data

    if (!post) notFound()

    return <PostOverviewPage post={post} />
}

export default PostPage
