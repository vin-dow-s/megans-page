'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { actionClient, ActionError } from './safe-action'
import { postSchema } from './schemas'
import { PostFormValues } from './types'

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

export const getPublishedPosts = actionClient.action(async () => {
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
})

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

export const getPostBySlug = actionClient
    .schema(z.string())
    .action(async ({ parsedInput }) => {
        const slug = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { slug },
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

export const updatePost = async (id: number, data: Partial<PostFormValues>) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        })

        if (!post) {
            console.log('Post not found')
            throw new ActionError('Post not found.')
        }

        return await prisma.post.update({
            where: { id },
            data,
            include: { Category: true },
        })
    } catch (error) {
        console.error('Error updating post:', error)
        throw new ActionError(
            error instanceof Error ? error.message : 'Failed to update post.',
        )
    }
}

export const deletePost = async (id: number) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        })

        if (!post) {
            console.log('Post not found')
            throw new ActionError('Post not found.')
        }

        return await prisma.post.delete({
            where: { id },
            include: { Category: true },
        })
    } catch (error) {
        console.error('Error deleting post:', error)
        throw new ActionError(
            error instanceof Error ? error.message : 'Failed to delete post.',
        )
    }
}
