import { CreateCategoryFormWrapper } from '@/components/admin/categories/CategoryForm'
import { getCategories } from '@/lib/categories'
import { notFound } from 'next/navigation'

const CreateCategoryPage = async () => {
    const categories = await getCategories()

    if (!categories) {
        return notFound()
    }

    return <CreateCategoryFormWrapper />
}

export default CreateCategoryPage
