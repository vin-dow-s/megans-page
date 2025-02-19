'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireAdmin } from './check-auth'
import { actionClient, ActionError } from './safe-action'
import { categorySchema } from './schemas'

/*
 * Public actions
 */
export const getCategoriesWithPublishedPosts = actionClient.action(async () => {
    try {
        return await prisma.category.findMany({
            where: {
                Posts: {
                    some: {
                        isPublished: true,
                    },
                },
            },
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
        console.error('Error fetching categories with published posts:', error)
        throw new ActionError(
            error instanceof Error
                ? error.message
                : 'Failed to get categories with published posts.',
        )
    }
})

/*
 * Admin actions
 */
export const getCategories = actionClient.action(async () => {
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
        throw new ActionError(
            error instanceof Error
                ? error.message
                : 'Failed to get categories.',
        )
    }
})

export const getCategoryById = actionClient
    .schema(z.number())
    .action(async ({ parsedInput: id }) => {
        await requireAdmin()

        try {
            const category = await prisma.category.findUnique({ where: { id } })

            if (!category) {
                throw new ActionError('Category not found.')
            }

            return category
        } catch (error) {
            console.error(`Error fetching category with id ${id}:`, error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get category by ID.',
            )
        }
    })

export const createCategory = actionClient
    .schema(categorySchema)
    .action(async ({ parsedInput }) => {
        await requireAdmin()

        const { name, color } = parsedInput

        try {
            const existingCategory = await prisma.category.findFirst({
                where: {
                    name: {
                        equals: parsedInput.name,
                        mode: 'insensitive',
                    },
                },
            })

            if (existingCategory)
                throw new ActionError('Category already exists.')

            const newCategory = await prisma.category.create({
                data: { name, color },
            })

            revalidatePath('/')
            revalidatePath(`/category/${newCategory.name}`)

            return newCategory
        } catch (error) {
            console.error('Error creating category:', error)

            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create category.',
            )
        }
    })

export const updateCategory = actionClient
    .schema(categorySchema.extend({ id: z.number() }))
    .action(async ({ parsedInput }) => {
        await requireAdmin()

        const { id, ...data } = parsedInput

        try {
            const updatedCategory = await prisma.category.update({
                where: { id },
                data,
            })

            revalidatePath('/')
            revalidatePath(`/category/${updatedCategory.name}`)

            return updatedCategory
        } catch (error) {
            console.error(`Error updating category with id ${id}:`, error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update category.',
            )
        }
    })

export const deleteCategory = actionClient
    .schema(z.number())
    .action(async ({ parsedInput: id }) => {
        await requireAdmin()

        try {
            const category = await prisma.category.findUnique({
                where: { id },
                include: { _count: { select: { Posts: true } } },
            })

            if (!category) {
                throw new ActionError('Category not found.')
            }

            if (category._count.Posts > 0) {
                throw new ActionError(
                    'Category has associated posts and cannot be deleted.',
                )
            }

            await prisma.category.delete({ where: { id } })

            revalidatePath('/')
            revalidatePath(`/category/${category.name}`)
        } catch (error) {
            console.error(`Error deleting category with id ${id}:`, error)

            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete category.',
            )
        }
    })
