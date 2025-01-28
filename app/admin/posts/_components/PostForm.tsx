'use client'

// Packages
import { zodResolver } from '@hookform/resolvers/zod'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import slugify from 'slugify'

// Actions
import { createPost, updatePost } from '@/lib/posts'
import { isActionSuccessful } from '@/lib/safe-action'

// Hooks
import { useCustomToast } from '@/hooks/useCustomToast'

// Schemas
import { postFormSchema } from '@/lib/schemas'

// Types
import { Category, PostFormValues } from '@/lib/types'

// Components
import Badge from '@/components/Badge'
import TextEditor from '@/components/TextEditor'
import { deleteFile, uploadFile } from '@/lib/media'
import { useState } from 'react'
import { Button } from '../../../../src/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../src/components/ui/form'
import { Input } from '../../../../src/components/ui/input'
import { Label } from '../../../../src/components/ui/label'
import {
    RadioGroup,
    RadioGroupItem,
} from '../../../../src/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../src/components/ui/select'

type PostFormValuesWithFile = PostFormValues & {
    thumbnailFile?: File
}

type CreatePostFormWrapperProps = {
    categories: Category[]
}

export const CreatePostFormWrapper = ({
    categories,
}: CreatePostFormWrapperProps) => {
    const router = useRouter()
    const { displaySuccessToast, displayErrorToast } = useCustomToast()

    const addSlugAndDate = (formData: PostFormValuesWithFile) => {
        const slug = slugify(formData.title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
            trim: true,
        })
        const publishedAt = new Date()

        return {
            ...formData,
            slug,
            publishedAt,
        }
    }

    const handleFormSubmit = async (formData: PostFormValuesWithFile) => {
        const postData = addSlugAndDate(formData)

        const file = formData.thumbnailFile

        let thumbnailUrl = ''

        if (file) {
            thumbnailUrl = await uploadFile(file)
            postData.thumbnail = thumbnailUrl
        }

        const result = await createPost(postData)

        if (!isActionSuccessful(result)) {
            console.error('Error creating post:', result?.serverError)
            displayErrorToast(result?.serverError ?? 'Failed to create post.')
            return
        }

        router.push('/admin/posts')
        displaySuccessToast('Post successfully created.')
    }

    return (
        <section className="mx-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h1 className="text-lg font-bold">Create Post</h1>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <PostForm onSubmit={handleFormSubmit} categories={categories} />
        </section>
    )
}

type EditPostFormWrapperProps = {
    postData: PostFormValuesWithFile
    postId: number
    categories: Category[]
}

export const EditPostFormWrapper = ({
    postData,
    postId,
    categories,
}: EditPostFormWrapperProps) => {
    const router = useRouter()
    const { displaySuccessToast, displayErrorToast } = useCustomToast()

    const handleFormSubmit = async (formData: PostFormValuesWithFile) => {
        try {
            const sanitizedContent = DOMPurify.sanitize(formData.content)
            const sanitizedFormData = {
                ...formData,
                content: sanitizedContent,
            }

            const existingThumbnailUrl = postData?.thumbnail
            let newThumbnailUrl = existingThumbnailUrl

            // If a new file is uploaded, upload the new thumbnail
            if (formData.thumbnailFile) {
                newThumbnailUrl = await uploadFile(formData.thumbnailFile)
                sanitizedFormData.thumbnail = newThumbnailUrl
            }

            const result = await updatePost({
                id: postId,
                data: sanitizedFormData,
            })

            if (!isActionSuccessful(result)) {
                console.error('Error updating post:', result?.serverError)
                displayErrorToast(
                    result?.serverError ?? 'Failed to update post.',
                )
                return
            }

            // Delete the old thumbnail
            if (existingThumbnailUrl) await deleteFile(existingThumbnailUrl)

            displaySuccessToast('Post successfully updated.')

            router.push('/admin/posts')
        } catch (error) {
            console.error('Error updating post:', error)
            displayErrorToast('Failed to update post.')
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
                onSubmit={handleFormSubmit}
                postData={postData}
                categories={categories}
                isEditing
            />
        </section>
    )
}

type PostFormProps = {
    onSubmit: (formData: PostFormValuesWithFile) => void
    postData?: PostFormValues
    categories?: Category[]
    isEditing?: boolean
}

export const PostForm = ({
    onSubmit,
    postData,
    categories,
    isEditing,
}: PostFormProps) => {
    const form = useForm<PostFormValuesWithFile>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: postData?.title ?? '',
            categoryId: postData?.categoryId ?? categories?.[0].id,
            description: postData?.description ?? '',
            content: postData?.content ?? '',
            isPublished: postData?.isPublished ?? false,
            thumbnail: postData?.thumbnail ?? '',
        },
    })
    const { displayWarningToast } = useCustomToast()
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(
        postData?.thumbnail ?? null,
    )

    const titleLength =
        useWatch({
            control: form.control,
            name: 'title',
        })?.length ?? 0

    const handleChange = (value: string) => {
        form.setValue('content', value)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                displayWarningToast('File size should be less than 5MB.')
                return
            }
            form.setValue('thumbnailFile', file, { shouldValidate: true })

            // Generate a preview URL
            const newPreviewUrl = URL.createObjectURL(file)
            setPreviewThumbnail(newPreviewUrl)

            // Clean up the old preview URL
            return () => URL.revokeObjectURL(newPreviewUrl)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-2"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Public title of the post."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                <span
                                    className={
                                        titleLength >= 50 && titleLength <= 60
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }
                                >
                                    {titleLength} characters.
                                </span>{' '}
                                Optimised length for SEO: 50-60 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="thumbnailFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl className="cursor-pointer gap-8">
                                <Input
                                    type="file"
                                    name="thumbnailFile"
                                    accept="image/*"
                                    placeholder="Thumbnail image of the post."
                                    onChange={handleFileChange}
                                />
                            </FormControl>
                            {previewThumbnail && (
                                <div className="mt-4">
                                    <Image
                                        src={previewThumbnail}
                                        alt="Thumbnail Preview"
                                        width={250}
                                        height={250}
                                    />
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(Number(value))
                                    }}
                                    value={String(field.value)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={String(category.id)}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Just open this it's juicy"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Short description of the post for the card
                                overview.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={() => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <TextEditor
                                    value={form.watch('content')}
                                    onChange={handleChange}
                                    className="bg-transparent"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                        <RadioGroup
                            value={field.value ? 'published' : 'draft'}
                            onValueChange={(value) =>
                                field.onChange(value === 'published')
                            }
                        >
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="draft" id="draft" />
                                    <Label htmlFor="draft">
                                        <Badge color="darkgrey" label="Draft" />
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value="published"
                                        id="published"
                                    />
                                    <Label htmlFor="published">
                                        <Badge
                                            color="green"
                                            label="Published"
                                        />
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    )}
                />
                <Button type="submit" className="cursor-pointer">
                    {isEditing ? 'Update Post' : 'Create Post'}
                </Button>
            </form>
        </Form>
    )
}
