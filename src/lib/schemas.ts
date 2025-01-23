import { z } from 'zod'

const basePostSchema = z.object({
    title: z
        .string()
        .trim()
        .nonempty('Title is required.')
        .min(3, 'Title is too short (3 characters minimum).'),
    categoryId: z.number().int().positive('Category is required.'),
    description: z
        .string()
        .trim()
        .nonempty('Description is required.')
        .min(3, 'Description is too short (3 characters minimum).'),
    content: z.string().trim().nonempty('Content is required.'),
    isPublished: z.boolean().default(false),
    thumbnail: z.string().optional(),
})

export const postSchema = basePostSchema.extend({
    slug: z.string(),
    publishedAt: z.date().optional(),
})

export const postFormSchema = basePostSchema

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required.'),
    color: z
        .string()
        .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format.')
        .default('#FFFFFF'),
})
