import { z } from 'zod'
import { categorySchema, postFormSchema } from './schemas'

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
    isPublished: boolean
    publishedAt?: Date | null
    Category: Category
}

export type PostFormValues = z.infer<typeof postFormSchema>
export type CategoryFormValues = z.infer<typeof categorySchema>
