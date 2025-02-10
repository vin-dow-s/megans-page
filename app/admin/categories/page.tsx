// Packages
import Link from 'next/link'

// Actions
import { getCategories } from '@/lib/categories'

// Components
import { Button } from '@/components/ui/button'
import CategoriesTable from './_components/CategoriesTable'

const CategoriesPage = async () => {
    const categoriesResult = await getCategories()

    if (!categoriesResult) throw new Error('Failed to load categories.')

    const categories = categoriesResult?.data || []

    return (
        <section className="mx-4 rounded-lg border border-(--color-main-purple) bg-white px-4">
            <nav className="flex items-center justify-between p-6 px-2 pb-12">
                <h2 className="text-lg font-bold">Categories</h2>
                <Button asChild>
                    <Link href="/admin/categories/create">
                        Create a Category
                    </Link>
                </Button>
            </nav>
            <CategoriesTable categories={categories} />
        </section>
    )
}

export default CategoriesPage
