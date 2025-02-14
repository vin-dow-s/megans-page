import { Category } from '@/lib/types'
import Link from 'next/link'

type CategoriesListProps = {
    categories: Category[]
    currentCategory?: Category
}

const CategoriesList = ({
    categories,
    currentCategory,
}: CategoriesListProps) => {
    return (
        <div className="mb-4 flex gap-10">
            <Link
                href={'/'}
                passHref
                className={`${!currentCategory ? 'font-bold underline' : 'font-normal'} category-link`}
            >
                All posts
            </Link>
            {categories.map((category) => {
                const isActive = category.name === currentCategory?.name

                return (
                    <Link
                        key={category.id}
                        href={
                            isActive
                                ? '/'
                                : `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}` // Replace spaces with dashes
                        }
                        className={`${isActive ? 'font-bold underline' : 'font-normal'} category-link`}
                        passHref
                    >
                        {category.name}
                    </Link>
                )
            })}
        </div>
    )
}

export default CategoriesList
