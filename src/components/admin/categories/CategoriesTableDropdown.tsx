'use client'

// Packages
import Link from 'next/link'

// Types
import { Category } from '@/lib/types'

// Actions
import { deleteCategory } from '@/lib/categories'
import { isActionSuccessful } from '@/lib/safe-action'

// Hooks
import { useCustomToast } from '@/hooks/useSuccessToast'

// Components
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Icons
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Pencil, Trash } from 'lucide-react'

type CategoriesTableDropdownProps = Readonly<{
    category: Category
    onCategoryDelete: (deletedCategoryId: number) => void
}>

const CategoriesTableDropdown = ({
    category,
    onCategoryDelete,
}: CategoriesTableDropdownProps) => {
    const { displaySuccessToast, displayErrorToast } = useCustomToast()

    const handleDeleteCategory = async () => {
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                const result = await deleteCategory(category.id)

                if (!isActionSuccessful(result)) {
                    console.error(
                        'Error deleting category:',
                        result?.serverError,
                    )
                    displayErrorToast(
                        result?.serverError ?? 'Failed to delete category.',
                    )
                    return
                }

                onCategoryDelete(category.id)
                displaySuccessToast(`Category successfully deleted.`)
            } catch (error) {
                console.error('Error deleting category:', error)

                const errorMessage =
                    (error as Error)?.message ??
                    'Failed to delete the category.'

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
