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
import { Button } from '@/components/ui/button'
import { PostForm } from './PostForm'

// Assets
import testImage from '../../../../public/assets/test.png'

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

    const existingThumbnail: string = postData.thumbnail.trim() || testImage.src

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
        <section className="mx-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h1 className="text-lg font-bold">Edit Post</h1>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
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
