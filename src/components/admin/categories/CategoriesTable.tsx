'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import CategoriesTableDropdown from './CategoriesTableDropdown'
import { Category } from '@/lib/types'
import Badge from '@/components/Badge'

type CategoriesTableProps = Readonly<{
    categories: Category[]
}>

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
    const onDeleteCategory = (category: Category) => {
        console.log('Delete category:', category)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Colour</TableHead>
                    <TableHead>Posts in Category</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
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
                                onCategoryDelete={onDeleteCategory}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable
