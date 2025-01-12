import { notFound } from 'next/navigation'
import { EditPostFormWrapper } from '@/components/admin/posts/PostForm'
import { getPostById } from '@/lib/posts'
import { getCategories } from '@/lib/categories'

const EditPostPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    const postId = Number(id)

    const [postResult, categories] = await Promise.all([
        getPostById(postId),
        getCategories(),
    ])

    const post = postResult?.data
    console.log('🚀 ~ post:', post)

    if (!post || !categories) {
        notFound()
    }

    return (
        <EditPostFormWrapper
            postData={{
                title: post.title,
                categoryId: post.categoryId,
                description: post.description,
                content: post.content,
                isPublished: post.isPublished,
            }}
            postId={postId}
            categories={categories}
        />
    )
}

export default EditPostPage
