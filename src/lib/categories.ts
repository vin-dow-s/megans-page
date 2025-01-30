'use server'

import { prisma } from '@/lib/prisma'
import { cache } from 'react'
import { z } from 'zod'
import { requireAdmin } from './check-auth'
import { actionClient, ActionError } from './safe-action'
import { categorySchema } from './schemas'

/*
 * Public actions
 */
export const getCategories = cache(
    actionClient.action(async () => {
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
    }),
)

/*
 * Admin actions
 */
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

            return await prisma.category.create({
                data: { name, color },
            })
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
            return await prisma.category.update({ where: { id }, data })
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

            return await prisma.category.delete({ where: { id } })
        } catch (error) {
            console.error(`Error deleting category with id ${id}:`, error)

            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete category.',
            )
        }
    })
