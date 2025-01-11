'use server'

import { z } from 'zod'
import { prisma } from './prisma'
import { actionClient } from './safe-action'
import { CreatePostFormSchema, UpdatePostFormSchema } from './schemas'
import slugify from 'slugify'

export const getPosts = actionClient.action(async () => {
    try {
        return await prisma.post.findMany({
            include: {
                Category: true,
            },
        })
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
    }
})

export const getPublishedPosts = actionClient.action(async () => {
    try {
        return await prisma.post.findMany({
            where: { isPublished: true },
            include: {
                Category: true,
            },
        })
    } catch (error) {
        console.error('Error fetching published posts:', error)
        throw error
    }
})

export const getPostById = actionClient
    .schema(z.number())
    .action(async ({ parsedInput }: { parsedInput: number }) => {
        const id = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: {
                    Category: true,
                },
            })

            if (!post) {
                console.log('Post not found')
                return null
            }

            return post
        } catch (error) {
            console.error('Error fetching post by ID:', error)
            throw error
        }
    })

export const getPostBySlug = actionClient
    .schema(z.string())
    .action(async ({ parsedInput }: { parsedInput: string }) => {
        const slug = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { slug },
                include: {
                    Category: true,
                },
            })

            if (!post) {
                console.log('Post not found')
                return null
            }

            return post
        } catch (error) {
            console.error('Error fetching post by slug:', error)
            throw error
        }
    })

export const createPost = actionClient
    .schema(CreatePostFormSchema)
    .action(async ({ parsedInput }) => {
        const { title, categoryId, description, content, isPublished } =
            parsedInput

        const slug = slugify(title, { lower: true, strict: true })
        const publishedAt = isPublished ? new Date() : ''

        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    categoryId,
                    description,
                    content,
                    isPublished,
                    slug,
                    publishedAt,
                },
            })

            return newPost
        } catch (error) {
            console.error('Error creating post:', error)
            throw error
        }
    })

export const updatePost = actionClient
    .schema(UpdatePostFormSchema)
    .action(async ({ parsedInput }) => {
        const { id, data } = parsedInput

        try {
            return await prisma.post.update({
                where: { id },
                data,
                include: { Category: true },
            })
        } catch (error) {
            console.error('Error updating post:', error)
            throw error
        }
    })

export const deletePost = actionClient
    .schema(z.number())
    .action(async ({ parsedInput }: { parsedInput: number }) => {
        try {
            const id = parsedInput

            const deletedPost = await prisma.post.delete({
                where: { id },
            })

            return deletedPost
        } catch (error) {
            console.error('Error deleting post:', error)
            throw error
        }
    })
