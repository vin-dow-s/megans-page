import { CreatePostFormWrapper } from '@/components/admin/posts/PostForm'
import { getCategories } from '@/lib/categories'
import { notFound } from 'next/navigation'

const CreatePostPage = async () => {
    const categories = await getCategories()

    if (!categories) return notFound()

    return <CreatePostFormWrapper categories={categories} />
}

export default CreatePostPage
