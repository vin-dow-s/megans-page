import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

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
    thumbnail: z.string(),
})

export const postSchema = basePostSchema.extend({
    slug: z.string(),
    publishedAt: z.date().optional(),
})

export const postFormSchema = basePostSchema.extend({
    thumbnailFile: z
        .any()
        .refine(
            (file) => file instanceof File,
            'A thumbnail image is required when creating a Post.',
        )
        .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
        )
        .refine(
            (file) => ALLOWED_FILE_TYPES.includes(file?.type),
            'Only JPG, PNG, or WEBP images are allowed.',
        )
        .optional(),
})

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required.'),
    color: z
        .string()
        .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format.')
        .default('#FFFFFF'),
})
