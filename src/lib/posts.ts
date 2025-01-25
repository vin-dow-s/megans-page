'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { z } from 'zod'
import { actionClient, ActionError } from './safe-action'
import { postSchema } from './schemas'

export const getPosts = actionClient.action(async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                Category: true,
            },
        })

        if (!posts || posts.length === 0) {
            console.log('No posts found.')
            return []
        }

        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw new ActionError(
            error instanceof Error ? error.message : 'Failed to get posts.',
        )
    }
})

export const getPublishedPosts = cache(
    actionClient.action(async () => {
        try {
            const posts = await prisma.post.findMany({
                where: { isPublished: true },
                include: {
                    Category: true,
                },
            })

            if (!posts || posts.length === 0) {
                console.log('No posts found.')
                return []
            }

            return posts
        } catch (error) {
            console.error('Error fetching published posts:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get published posts.',
            )
        }
    }),
)

export const getPublishedPostsByCategory = cache(
    actionClient
        .schema(z.string())
        .action(async ({ parsedInput: category }) => {
            try {
                const posts = await prisma.post.findMany({
                    where: {
                        Category: {
                            name: {
                                equals: category,
                                mode: 'insensitive',
                            },
                        },
                        isPublished: true,
                    },
                    include: {
                        Category: true,
                    },
                })

                return posts || []
            } catch (error) {
                console.error('Error fetching published posts:', error)
                throw new ActionError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to get published posts.',
                )
            }
        }),
)

export const getPublishedPostBySlug = cache(
    actionClient.schema(z.string()).action(async ({ parsedInput }) => {
        const slug = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { slug, isPublished: true },
                include: {
                    Category: true,
                },
            })

            if (!post) {
                console.log('Post not found.')
                throw new ActionError('Post not found.')
            }

            return post
        } catch (error) {
            console.error('Error fetching post by slug:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get post by slug.',
            )
        }
    }),
)

export const getPostById = actionClient
    .schema(z.number())
    .action(async ({ parsedInput }) => {
        const id = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: {
                    Category: true,
                },
            })

            if (!post) {
                console.log('Post not found.')
                throw new ActionError('Post not found.')
            }

            return post
        } catch (error) {
            console.error('Error fetching post by ID:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to get post by ID.',
            )
        }
    })

export const createPost = actionClient
    .schema(postSchema)
    .action(async ({ parsedInput }) => {
        try {
            const existingPost = await prisma.post.findFirst({
                where: { title: parsedInput.title },
            })

            if (existingPost) {
                console.log('Post with this slug already exists.')
                throw new ActionError('A post with this title already exists.')
            }

            const createdPost = await prisma.post.create({
                data: parsedInput,
                include: { Category: true },
            })

            revalidatePath('/')
            revalidatePath(`/blog/category/${createdPost.Category?.name}`)

            return createdPost
        } catch (error) {
            console.error('Error in createPost:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create post.',
            )
        }
    })

export const updatePost = actionClient
    .schema(
        z.object({
            id: z.number(),
            data: postSchema.partial(),
        }),
    )
    .action(async ({ parsedInput }) => {
        const { id, data } = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { id },
            })

            if (!post) {
                console.log('Post not found')
                throw new ActionError('Post not found.')
            }

            const updatedPost = await prisma.post.update({
                where: { id },
                data,
                include: { Category: true },
            })

            revalidatePath('/')
            revalidatePath(`/blog/category/${updatedPost.Category?.name}`)
            revalidatePath(`/blog/${updatedPost.slug}`)

            return updatedPost
        } catch (error) {
            console.error('Error updating post:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update post.',
            )
        }
    })

export const deletePost = actionClient
    .schema(z.number())
    .action(async ({ parsedInput: id }) => {
        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: { Category: true },
            })

            if (!post) {
                console.log('Post not found')
                throw new ActionError('Post not found.')
            }

            revalidatePath('/')
            revalidatePath(`/blog/category/${post.Category?.name}`)
            revalidatePath(`/blog/${post.slug}`)

            return await prisma.post.delete({
                where: { id },
                include: { Category: true },
            })
        } catch (error) {
            console.error('Error deleting post:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete post.',
            )
        }
    })
