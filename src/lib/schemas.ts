import { z } from 'zod'

export const postSchema = z.object({
    title: z.string(),
    slug: z.string(),
    categoryId: z.number(),
    description: z.string(),
    content: z.string(),
    publishedAt: z.date().optional(),
    isPublished: z.boolean().default(false),
    thumbnail: z.string().optional(),
})

export const postFormSchema = z.object({
    title: z.string(),
    categoryId: z.number(),
    description: z.string(),
    content: z.string(),
    isPublished: z.boolean().default(false),
    thumbnail: z.string().optional(),
})

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    color: z
        .string()
        .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
        .default('#FFFFFF'),
})
