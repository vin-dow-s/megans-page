'use server'

import { prisma } from '@/lib/prisma'

export const getCategories = async () => {
    return prisma.category.findMany({
        select: {
            id: true,
            name: true,
            color: true,
            _count: {
                select: { Posts: true },
            },
        },
    })
}

export const getCategoryById = async (id: number) => {
    return prisma.category.findUnique({ where: { id } })
}

export const createCategory = async (data: { name: string; color: string }) => {
    return prisma.category.create({ data })
}

export const updateCategory = async (
    id: number,
    data: { name: string; color: string },
) => {
    return prisma.category.update({ where: { id }, data })
}

export const deleteCategory = async (id: number) => {
    return prisma.category.delete({ where: { id } })
}
