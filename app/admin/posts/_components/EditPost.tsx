'use client'

// Packages
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Hooks
import { useCustomToast } from '@/hooks/useCustomToast'
import { updateExistingPost } from '@/hooks/usePostActions'

// Types
import { Category, PostFormValues } from '@/lib/types'

// Components
import { PostForm } from './PostForm'

// Assets
import { ArrowLeftIcon } from 'lucide-react'
import defaultThumbnail from '../../../../public/assets/default-thumbnail.png'

export const EditPost = ({
    postData,
    postId,
    categories,
}: {
    postData: PostFormValues
    postId: number
    categories: Category[]
}) => {
    const { displaySuccessToast, displayErrorToast } = useCustomToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const existingThumbnail: string =
        postData.thumbnail.trim() || defaultThumbnail.src

    const handleSubmit = async (formData: PostFormValues) => {
        setLoading(true)

        try {
            await updateExistingPost(formData, postId, existingThumbnail)
            displaySuccessToast('Post successfully updated.')
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
            <h1 className="mb-4 p-4 px-2 text-4xl font-medium">Edit Post</h1>
            <PostForm
                onSubmit={handleSubmit}
                postData={{ ...postData, thumbnail: existingThumbnail }}
                categories={categories}
                isEditing
                isLoading={loading}
            />
        </section>
    )
}
