import { EditCategoryFormWrapper } from '@/components/admin/categories/CategoryForm'
import { getCategoryById } from '@/lib/categories'
import { notFound } from 'next/navigation'

const EditCategoryPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const categoryId = Number(id)

    const categoryResult = await getCategoryById(categoryId)

    const category = categoryResult?.data

    if (!category) {
        notFound()
    }

    return <EditCategoryFormWrapper categoryData={category} />
}

export default EditCategoryPage
