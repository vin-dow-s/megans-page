'use client'

import { Badge } from '@/components/ui/badge'
import { Category } from '@/lib/types'
import { useRouter } from 'next/navigation'

type CategoriesListProps = {
    categories: Category[]
    currentCategory?: Category
}

const CategoriesList = ({
    categories,
    currentCategory,
}: CategoriesListProps) => {
    const router = useRouter()

    const handleCategoryClick = (categoryName: string) => {
        if (
            currentCategory?.name.toLowerCase() === categoryName.toLowerCase()
        ) {
            router.push('/')
        } else {
            router.push(`/category/${categoryName.toLowerCase()}`)
        }
    }

    return (
        <div className="my-8 flex justify-center gap-10">
            {categories.map((category) => {
                const isActive = category.name === currentCategory?.name
                const variant = isActive ? 'default' : 'outline'

                return (
                    <Badge
                        key={category.id}
                        variant={variant}
                        className={`cursor-pointer px-4 py-2 text-sm font-medium ${
                            variant === 'outline' ? 'hover:bg-gray-100' : ''
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        {category.name}
                    </Badge>
                )
            })}
        </div>
    )
}

export default CategoriesList
