'use server'

import { prisma } from '@/lib/prisma'

export const getCategories = async () => {
    try {
        return await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                color: true,
                _count: {
                    select: { Posts: true },
                },
            },
        })
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw new Error('Failed to get categories.')
    }
}

export const getCategoryById = async (id: number) => {
    try {
        return await prisma.category.findUnique({ where: { id } })
    } catch (error) {
        console.error(`Error fetching category with id ${id}:`, error)
        throw new Error('Failed to get category by ID posts.')
    }
}

export const createCategory = async (data: { name: string; color: string }) => {
    try {
        const existingCategory = await prisma.category.findFirst({
            where: { name: data.name },
        })

        if (existingCategory) throw new Error('Category already exists.')

        return await prisma.category.create({
            data: { name: data.name.toUpperCase(), color: data.color },
        })
    } catch (error) {
        console.error('Error creating category:', error)

        if (error instanceof Error) {
            throw error
        }

        throw new Error('Failed to create category.')
    }
}

export const updateCategory = async (
    id: number,
    data: { name: string; color: string },
) => {
    try {
        return await prisma.category.update({ where: { id }, data })
    } catch (error) {
        console.error(`Error updating category with id ${id}:`, error)
        throw new Error('Failed to update category')
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { Posts: true } } },
        })

        if (!category) {
            throw new Error('Category not found.')
        }

        if (category._count.Posts > 0) {
            throw new Error(
                'Category has associated posts and cannot be deleted.',
            )
        }

        return await prisma.category.delete({ where: { id } })
    } catch (error) {
        console.error(`Error deleting category with id ${id}:`, error)

        if (error instanceof Error) {
            throw error
        }

        throw new Error('Failed to delete category.')
    }
}
