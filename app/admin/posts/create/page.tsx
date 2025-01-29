// Packages
import { notFound, redirect } from 'next/navigation'

// Actions
import { getCategories } from '@/lib/categories'

// Components
import { CreatePost } from '../_components/CreatePost'

const CreatePostPage = async () => {
    const categoriesResult = await getCategories()

    const categories = categoriesResult?.data

    if (!categories) return notFound()
    if (categories.length === 0) redirect('/admin/categories/create')

    return <CreatePost categories={categories} />
}

export default CreatePostPage
