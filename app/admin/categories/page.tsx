// Packages
import Link from 'next/link'

// Actions
import { getCategories } from '@/lib/categories'

// Components
import CategoriesTable from '@/components/admin/categories/CategoriesTable'

const CategoriesPage = async () => {
    const categoriesResult = await getCategories()

    if (!categoriesResult) throw new Error('Failed to load categories.')

    const categories = categoriesResult?.data || []

    return (
        <section className="mx-4 rounded-sm border-none bg-white p-6 shadow-xs">
            <nav className="mb-12 flex items-center justify-between">
                <h2 className="text-4xl font-medium">Categories</h2>
                <Link
                    href="/admin/categories/create"
                    className="main-button shadow-xs"
                >
                    Create a Category
                </Link>
            </nav>
            <CategoriesTable categories={categories} />
        </section>
    )
}

export default CategoriesPage
