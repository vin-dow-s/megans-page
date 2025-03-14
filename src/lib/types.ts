import { z } from 'zod'
import { categorySchema, contactFormSchema, postFormSchema } from './schemas'

export type Category = {
    id: number
    name: string
    color: string
    Posts?: Post[]
    _count?: {
        Posts: number
    }
}

export type Post = {
    id: number
    title: string
    slug: string
    categoryId: number
    description: string
    content: string
    publishedAt?: Date | null
    updatedAt: Date
    isPublished: boolean
    thumbnail?: string | null
    Category: Category
}

export type PostFormValues = z.infer<typeof postFormSchema>
export type CategoryFormValues = z.infer<typeof categorySchema>
export type ContactFormValues = z.infer<typeof contactFormSchema>
