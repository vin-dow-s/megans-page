import CategoriesTable from '@/components/admin/categories/CategoriesTable'
import { Button } from '@/components/ui/button'
import { getCategories } from '@/lib/categories'
import Link from 'next/link'

const CategoriesPage = async () => {
    const categoriesResult = await getCategories()

    if (!categoriesResult) {
        return (
            <section className="mx-4 rounded-lg border px-4">
                <h2 className="text-lg font-bold">Failed to load categories</h2>
            </section>
        )
    }

    const categories = categoriesResult?.data || []

    return (
        <section className="mx-4 rounded-lg border px-4">
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
