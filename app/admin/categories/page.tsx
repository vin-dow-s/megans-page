// Packages
import Link from 'next/link'

// Actions
import { getCategories } from '@/lib/categories'

// Components
import CategoriesTable from './_components/CategoriesTable'

const CategoriesPage = async () => {
    const categoriesResult = await getCategories()

    if (!categoriesResult) throw new Error('Failed to load categories.')

    const categories = categoriesResult?.data || []

    return (
        <section className="mx-4 rounded-sm border-none bg-white px-4">
            <nav className="flex items-center justify-between p-6 px-2 pb-12">
                <h2 className="text-xl font-bold">Categories</h2>
                <Link href="/admin/categories/create" className="admin-button">
                    Create a Category
                </Link>
            </nav>
            <CategoriesTable categories={categories} />
        </section>
    )
}

export default CategoriesPage
