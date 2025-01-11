import { z } from 'zod'

// Category Schema
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    postCount: z.number().optional(),
})
export type Category = z.infer<typeof CategorySchema>

export const CreateCategoryFormSchema = CategorySchema.pick({
    name: true,
})

export type CategoryFormValues = z.infer<typeof CreateCategoryFormSchema>

// Post Schema
export const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    categoryId: z.number(),
    description: z.string(),
    content: z.string(),
    publishedAt: z.coerce.date().optional(),
    isPublished: z.boolean().default(false),
    category: CategorySchema.optional(),
})
export type Post = z.infer<typeof PostSchema>

// Create Post Form Schema
export const CreatePostFormSchema = z.object({
    title: z.string(),
    categoryId: z.number(),
    description: z.string(),
    content: z.string(),
    isPublished: z.boolean().default(false),
})
export type CreatePostFormValues = z.infer<typeof CreatePostFormSchema>

// Update Post Form Schema
export const UpdatePostFormSchema = z.object({
    id: z.number(),
    data: PostSchema.partial().omit({
        id: true,
        slug: true,
        publishedAt: true,
    }),
})
export type UpdatePostFormValues = z.infer<typeof UpdatePostFormSchema>
