'use client'

// Packages
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Hooks
import { useCustomToast } from '@/hooks/useCustomToast'
import { createNewPost } from '@/hooks/usePostActions'

// Types
import { Category, PostFormValues } from '@/lib/types'

// Components
import { Button } from '@/components/ui/button'
import { PostForm } from './PostForm'

export const CreatePost = ({ categories }: { categories: Category[] }) => {
    const { displaySuccessToast, displayErrorToast } = useCustomToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (formData: PostFormValues) => {
        setLoading(true)
        try {
            await createNewPost(formData)
            displaySuccessToast('Post successfully created.')
            router.push('/admin/posts')
        } catch (error) {
            displayErrorToast(
                error instanceof Error ? error.message : 'An error occurred.',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="mx-4 rounded-lg border bg-white p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h1 className="text-lg font-bold">Create Post</h1>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <PostForm
                onSubmit={handleSubmit}
                categories={categories}
                isLoading={loading}
            />
        </section>
    )
}
