// Packages
import { notFound } from 'next/navigation'

// Actions
import { getCategories } from '@/lib/categories'
import { getPostById } from '@/lib/posts'

// Components
import { EditPostFormWrapper } from '../../_components/PostForm'

const EditPostPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    const postId = Number(id)

    const [postResult, categoriesResult] = await Promise.all([
        getPostById(postId),
        getCategories(),
    ])

    const post = postResult?.data
    const categories = categoriesResult?.data

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
