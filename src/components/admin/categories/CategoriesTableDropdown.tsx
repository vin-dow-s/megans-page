'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCustomToast } from '@/hooks/useSuccessToast'
import { deleteCategory } from '@/lib/categories'
import { Category } from '@/lib/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

type CategoriesTableDropdownProps = Readonly<{
    category: Category
    onCategoryDelete: (deletedCategory: Category) => void
}>

const CategoriesTableDropdown = ({
    category,
    onCategoryDelete,
}: CategoriesTableDropdownProps) => {
    const { displaySuccessToast, displayErrorToast } = useCustomToast()

    const handleDeleteCategory = async () => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                const deletedCategory = await deleteCategory(category.id)
                onCategoryDelete(deletedCategory)
                displaySuccessToast(`Category successfully deleted.`)
            } catch (error) {
                console.error('Error deleting category:', error)

                const errorMessage =
                    (error as Error)?.message ?? 'Failed to delete the category'

                displayErrorToast(errorMessage)
            }
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="size-8 p-0 hover:bg-gray-200"
                >
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild className="gap-4 p-2">
                    <Link href={`/admin/categories/${category.id}/edit`}>
                        <Pencil />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleDeleteCategory}
                    className="gap-4 p-2 text-red-600 focus:text-red-600"
                >
                    <Trash />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoriesTableDropdown
