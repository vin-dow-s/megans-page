// Packages
import { notFound } from 'next/navigation'

// Actions
import { getCategories } from '@/lib/categories'

// Components
import { CreatePostFormWrapper } from '../_components/PostForm'

const CreatePostPage = async () => {
    const categoriesResult = await getCategories()

    const categories = categoriesResult?.data

    if (!categories) return notFound()

    return <CreatePostFormWrapper categories={categories} />
}

export default CreatePostPage
