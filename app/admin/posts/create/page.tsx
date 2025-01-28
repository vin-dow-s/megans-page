// Packages
import { notFound, redirect } from 'next/navigation'

// Actions
import { getCategories } from '@/lib/categories'

// Components
import { CreatePostFormWrapper } from '../_components/PostForm'

const CreatePostPage = async () => {
    const categoriesResult = await getCategories()

    const categories = categoriesResult?.data

    if (!categories) return notFound()
    if (categories.length === 0) redirect('/admin/categories/create')

    return <CreatePostFormWrapper categories={categories} />
}

export default CreatePostPage
