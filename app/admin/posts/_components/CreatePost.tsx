'use client'

// Packages
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Hooks
import { useCustomToast } from '@/hooks/useCustomToast'
import { createNewPost } from '@/hooks/usePostActions'

// Types
import { Category, PostFormValues } from '@/lib/types'

// Components
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
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
        <section className="mx-4 rounded-sm border-none bg-white p-4">
            <div className="mb-4 flex gap-10">
                <Link href={`/admin/posts`} className="category-link">
                    <div className="flex items-center gap-1 font-normal">
                        <ArrowLeftIcon size={14} /> Back
                    </div>
                </Link>
            </div>
            <h1 className="p-4 px-2 text-xl font-bold">Create Post</h1>
            <PostForm
                onSubmit={handleSubmit}
                categories={categories}
                isLoading={loading}
            />
        </section>
    )
}
