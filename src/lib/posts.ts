'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { z } from 'zod'
import { requireAdmin } from './check-auth'
import { deleteFile } from './media'
import { actionClient, ActionError } from './safe-action'
import { postSchema } from './schemas'

/*
 * Public actions
 */

export const getPublishedPosts = cache(
    actionClient.action(async () => {
        try {
            const posts = await prisma.post.findMany({
                where: { isPublished: true },
                include: {
                    Category: true,
                },
            })

            if (!posts || posts.length === 0) return []

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
            const post = await prisma.post.findFirst({
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

/*
 * Admin actions
 */
export const getPosts = actionClient.action(async () => {
    await requireAdmin()

    try {
        const posts = await prisma.post.findMany({
            include: {
                Category: true,
            },
        })

        if (!posts || posts.length === 0) return []

        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw new ActionError(
            error instanceof Error ? error.message : 'Failed to get posts.',
        )
    }
})

export const getPostById = actionClient
    .schema(z.number())
    .action(async ({ parsedInput }) => {
        await requireAdmin()

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
        await requireAdmin()

        try {
            const existingPost = await prisma.post.findFirst({
                where: { title: parsedInput.title },
            })

            if (existingPost)
                throw new ActionError('A post with this title already exists.')

            const createdPost = await prisma.post.create({
                data: {
                    ...parsedInput,
                    publishedAt: parsedInput.isPublished ? new Date() : null,
                },
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
        await requireAdmin()

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
                data: {
                    ...data,
                    publishedAt:
                        post.publishedAt ??
                        (data.isPublished ? new Date() : null),
                },
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
        await requireAdmin()

        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: { Category: true },
            })

            if (!post) {
                console.log('Post not found')
                throw new ActionError('Post not found.')
            }

            if (post.isPublished) {
                throw new ActionError(
                    'Post needs to be unpublished before being deleted.',
                )
            }

            const thumbnailToDelete = post.thumbnail

            await prisma.post.delete({
                where: { id },
                include: { Category: true },
            })

            if (thumbnailToDelete) await deleteFile(thumbnailToDelete)

            revalidatePath('/')
            revalidatePath(`/blog/category/${post.Category?.name}`)
            revalidatePath(`/blog/${post.slug}`)
        } catch (error) {
            console.error('Error deleting post:', error)
            throw new ActionError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete post.',
            )
        }
    })
