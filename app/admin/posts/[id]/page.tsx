// Packages
import { notFound } from 'next/navigation'

// Actions
import { getPostById } from '@/lib/posts'

// Components
import PostPreviewPage from '@/components/admin/posts/PostPreviewPage'

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const postId = Number(id)
    const postResult = await getPostById(postId)

    const post = postResult?.data

    if (!post) notFound()

    return <PostPreviewPage post={post} />
}

export default PostPage
