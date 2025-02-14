// Packages
import DOMPurify from 'dompurify'
import slugify from 'slugify'

// Actions
import { deleteFile, uploadFile } from '@/lib/media'
import { createPost, updatePost } from '@/lib/posts'
import { isActionSuccessful } from '@/lib/safe-action'

// Types
import { PostFormValues } from '@/lib/types'

export const createNewPost = async (formData: PostFormValues) => {
    const slug = slugify(formData.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
        trim: true,
    })
    const publishedAt = new Date()

    let thumbnailUrl = ''

    if (formData.thumbnailFile) {
        thumbnailUrl = await uploadFile(formData.thumbnailFile)
    } else throw new Error('A thumbnail is required when creating a Post.')

    const result = await createPost({
        ...formData,
        slug,
        publishedAt,
        thumbnail: thumbnailUrl,
    })

    if (!isActionSuccessful(result))
        throw new Error(result?.serverError ?? 'Failed to create post.')
}

export const updateExistingPost = async (
    formData: PostFormValues,
    postId: number,
    oldThumbnail: string,
) => {
    const sanitizedContent = DOMPurify.sanitize(formData.content)
    let newThumbnailUrl = oldThumbnail

    if (formData.thumbnailFile) {
        newThumbnailUrl = await uploadFile(formData.thumbnailFile)
    }

    const updateData = {
        ...formData,
        content: sanitizedContent,
        ...(formData.thumbnailFile && { thumbnail: newThumbnailUrl }),
    }

    const result = await updatePost({
        id: postId,
        data: updateData,
    })

    if (!isActionSuccessful(result))
        throw new Error(result?.serverError ?? 'Failed to update post.')

    if (formData.thumbnailFile && oldThumbnail) await deleteFile(oldThumbnail)
}
