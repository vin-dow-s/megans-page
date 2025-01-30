'use server'

import { del, put } from '@vercel/blob'
import { requireAdmin } from './check-auth'

// Upload a file to Vercel Blob Storage
export const uploadFile = async (file: File): Promise<string> => {
    await requireAdmin()

    try {
        if (!file) {
            throw new Error('No file provided for upload.')
        }

        const blob = await put(file.name, file, {
            access: 'public',
        })

        if (!blob.url) {
            throw new Error('Failed to upload the file. No URL returned.')
        }

        return blob.url
    } catch (error) {
        console.error('Error in uploadFile:', error)
        throw new Error('Failed to upload file. Please try again later.')
    }
}

// Delete a file from Vercel Blob Storage
export const deleteFile = async (url: string): Promise<void> => {
    await requireAdmin()

    try {
        if (!url) {
            throw new Error('No URL provided for deletion.')
        }

        await del(url)
    } catch (error) {
        console.error('Error in deleteFile:', error)
        throw new Error('Failed to delete file. Please try again later.')
    }
}
