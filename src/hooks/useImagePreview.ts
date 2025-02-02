import { PostFormValues } from '@/lib/types'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useCustomToast } from './useCustomToast'

export const useImagePreview = (initialUrl: string | null) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl)
    const [originalUrl] = useState<string | null>(initialUrl)
    const [imageInfo, setImageInfo] = useState<{
        name: string
        size: string
        width: number
        height: number
        type: string
    } | null>(null)

    const { displayWarningToast } = useCustomToast()

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        form: UseFormReturn<PostFormValues>,
    ) => {
        const file = event.target.files?.[0]

        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            return displayWarningToast('File size should be less than 5MB.')
        }

        const image = new Image()
        image.src = URL.createObjectURL(file)

        image.onload = () => {
            setImageInfo({
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                width: image.width,
                height: image.height,
                type: file.type,
            })
        }

        form.setValue('thumbnailFile', file, { shouldValidate: true })
        setPreviewUrl(image.src)

        return () => URL.revokeObjectURL(image.src)
    }

    const resetPreview = (form: UseFormReturn<PostFormValues>) => {
        setPreviewUrl(null)
        setImageInfo(null)
        form.setValue('thumbnailFile', undefined, { shouldValidate: true })
    }

    const restoreOriginalImage = (form: UseFormReturn<PostFormValues>) => {
        setPreviewUrl(originalUrl)
        form.setValue('thumbnailFile', undefined, { shouldValidate: true })
        form.setValue('thumbnail', originalUrl ?? '')
        setImageInfo(null)
    }

    return {
        previewUrl,
        imageInfo,
        handleFileChange,
        resetPreview,
        restoreOriginalImage,
    }
}
