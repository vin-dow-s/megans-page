'use client'

// Packages
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

// Actions
import { createCategory, updateCategory } from '@/lib/categories'
import { categorySchema } from '@/lib/schemas'
import { Category, CategoryFormValues } from '@/lib/types'

// Hooks
import { useCustomToast } from '@/hooks/useCustomToast'

// Components
import { ArrowLeftIcon } from 'lucide-react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../src/components/ui/form'
import { Input } from '../../../../src/components/ui/input'

export const CreateCategoryFormWrapper = () => {
    const router = useRouter()
    const { displaySuccessToast, displayErrorToast } = useCustomToast()

    const handleFormSubmit = async (formData: CategoryFormValues) => {
        try {
            await createCategory(formData)

            displaySuccessToast('Category successfully created.')

            router.push('/admin/categories')
        } catch (error) {
            console.error('Error creating category:', error)

            const errorMessage =
                (error as Error)?.message ?? 'Failed to create the category.'

            displayErrorToast(errorMessage)
        }
    }

    return (
        <section className="mx-4 rounded-sm border-none bg-white p-4">
            <div className="mb-4 flex gap-10">
                <Link href={`/admin/categories`} className="category-link">
                    <div className="flex items-center gap-1 font-normal">
                        <ArrowLeftIcon size={14} /> Back
                    </div>
                </Link>
            </div>
            <h1 className="p-4 px-2 text-xl font-bold">Create Category</h1>
            <CategoryForm onSubmit={handleFormSubmit} />
        </section>
    )
}

type EditCategoryFormWrapperProps = {
    categoryData: Category
}

export const EditCategoryFormWrapper = ({
    categoryData,
}: EditCategoryFormWrapperProps) => {
    const router = useRouter()
    const { displaySuccessToast, displayErrorToast } = useCustomToast()

    const handleUpdateCategory = async (formData: CategoryFormValues) => {
        try {
            await updateCategory({
                id: categoryData.id,
                name: formData.name,
                color: formData.color,
            })

            displaySuccessToast('Category successfully updated.')

            router.push('/admin/categories')
        } catch (error) {
            console.error('Error updating category:', error)
            displayErrorToast('Failed to update the category.')
        }
    }

    return (
        <section className="mx-4 rounded-sm border-none bg-white p-4">
            <div className="mb-4 flex gap-10">
                <Link href={`/admin/categories`} className="category-link">
                    <div className="flex items-center gap-1 font-normal">
                        <ArrowLeftIcon size={14} /> Back
                    </div>
                </Link>
            </div>
            <h1 className="p-4 px-2 text-xl font-bold">Edit Category</h1>
            <CategoryForm
                onSubmit={handleUpdateCategory}
                categoryData={categoryData}
                isEditing
            />
        </section>
    )
}

type CategoryFormProps = {
    onSubmit: (data: CategoryFormValues) => void
    categoryData?: CategoryFormValues
    isEditing?: boolean
}

export const CategoryForm = ({
    onSubmit,
    categoryData,
    isEditing,
}: CategoryFormProps) => {
    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: categoryData || {
            name: '',
            color: '#ff0000',
        },
    })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-2"
            >
                <div className="grid grid-cols-12 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                {' '}
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name of the category."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Color</FormLabel>
                                <FormControl className="cursor-pointer">
                                    <Input type="color" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <button type="submit" className="admin-button cursor-pointer">
                    {isEditing ? 'Update' : 'Create'}
                </button>
            </form>
        </Form>
    )
}
