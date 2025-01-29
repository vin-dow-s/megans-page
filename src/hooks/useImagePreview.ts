import { PostFormValues } from '@/lib/types'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useCustomToast } from './useCustomToast'

export const useImagePreview = (initialUrl: string | null) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl)
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

        form.setValue('thumbnailFile', file, { shouldValidate: true })
        const newPreviewUrl = URL.createObjectURL(file)
        setPreviewUrl(newPreviewUrl)

        return () => URL.revokeObjectURL(newPreviewUrl)
    }

    return { previewUrl, handleFileChange }
}
