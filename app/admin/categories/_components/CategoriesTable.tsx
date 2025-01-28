'use client'

// Packages
import { useState } from 'react'

// Types
import { Category } from '@/lib/types'

// Components
import Badge from '@/components/Badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import CategoriesTableDropdown from './CategoriesTableDropdown'

type CategoriesTableProps = Readonly<{
    categories: Category[]
}>

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
    const [categoryList, setCategoryList] = useState(categories)

    const handleDeleteCategory = (deletedCategoryId: number) => {
        try {
            setCategoryList((prevCategories) =>
                prevCategories.filter((c) => c.id !== deletedCategoryId),
            )
        } catch (error) {
            console.error('Failed to delete category:', error)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead className="w-80">Name</TableHead>
                    <TableHead className="w-40">Colour</TableHead>
                    <TableHead className="w-40">Posts in Category</TableHead>
                    <TableHead className="w-16"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categoryList?.length > 0 ? (
                    categoryList.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <Badge
                                    color={category.color}
                                    label={category.color}
                                />
                            </TableCell>
                            <TableCell>{category._count?.Posts}</TableCell>
                            <TableCell>
                                <CategoriesTableDropdown
                                    category={category}
                                    onCategoryDelete={handleDeleteCategory}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow className="h-32">
                        <TableCell
                            colSpan={6}
                            className="pointer-events-none text-center text-gray-500 italic"
                        >
                            No category found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable
