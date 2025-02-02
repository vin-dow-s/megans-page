'use client'

// Packages
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm, useWatch } from 'react-hook-form'

// Hooks
import { useImagePreview } from '@/hooks/useImagePreview'

// Schemas
import { postFormSchema } from '@/lib/schemas'

// Types
import { Category, PostFormValues } from '@/lib/types'

// Components
import Badge from '@/components/Badge'
import TextEditor from '@/components/TextEditor'
import { CircleX } from 'lucide-react'
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

type PostFormProps = {
    onSubmit: (formData: PostFormValues) => void
    postData?: PostFormValues
    categories?: Category[]
    isEditing?: boolean
    isLoading?: boolean
}

export const PostForm = ({
    onSubmit,
    postData,
    categories,
    isEditing,
    isLoading,
}: PostFormProps) => {
    const form = useForm<PostFormValues>({
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
    const {
        previewUrl,
        imageInfo,
        handleFileChange,
        resetPreview,
        restoreOriginalImage,
    } = useImagePreview(postData?.thumbnail ?? null)

    const titleLength =
        useWatch({
            control: form.control,
            name: 'title',
        })?.length ?? 0

    const handleChange = (value: string) => {
        form.setValue('content', value)
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
                            <FormControl className="gap-8">
                                {previewUrl ? (
                                    <div className="relative flex h-30 rounded-lg border shadow-xs">
                                        <Image
                                            src={previewUrl}
                                            alt="Thumbnail Preview"
                                            width={200}
                                            height={250}
                                            className="rounded-r-none"
                                        />
                                        <div className="flex flex-col justify-center text-xs sm:text-sm">
                                            <p className="font-medium">
                                                {imageInfo?.name ??
                                                    'Current Image'}
                                            </p>

                                            <p className="text-gray-500">
                                                {imageInfo ? (
                                                    <span>
                                                        {' '}
                                                        {imageInfo.size} -{' '}
                                                        {imageInfo.width}x
                                                        {imageInfo.height}px -{' '}
                                                        {imageInfo.type}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs">
                                                        {previewUrl.toString()}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <CircleX
                                            size={20}
                                            strokeWidth={1.25}
                                            onClick={() => resetPreview(form)}
                                            className="absolute top-0 right-0 m-4 cursor-pointer"
                                        />
                                    </div>
                                ) : (
                                    <Input
                                        type="file"
                                        name="thumbnailFile"
                                        accept="image/*"
                                        placeholder="Thumbnail image of the post."
                                        className="cursor-pointer"
                                        onChange={(e) =>
                                            handleFileChange(e, form)
                                        }
                                    />
                                )}
                            </FormControl>
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
                <Button
                    type="submit"
                    className="cursor-pointer max-sm:w-full"
                    disabled={isLoading}
                >
                    {isLoading
                        ? 'Processing...'
                        : isEditing
                          ? 'Update Post'
                          : 'Create Post'}
                </Button>
                {isEditing && (
                    <Button
                        type="reset"
                        variant="secondary"
                        onClick={() => {
                            form.reset()
                            restoreOriginalImage(form)
                        }}
                        className="m-4 cursor-pointer max-sm:w-full"
                    >
                        Reset
                    </Button>
                )}
            </form>
        </Form>
    )
}
