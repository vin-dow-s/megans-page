'use client'

import { useCustomToast } from '@/hooks/useSuccessToast'
import { createCategory, updateCategory } from '@/lib/categories'
import { categorySchema } from '@/lib/schemas'
import { Category, CategoryFormValues } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'

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
        <section className="mx-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h1 className="text-lg font-bold">Create Category</h1>
                <Button asChild variant="secondary">
                    <Link href="/admin/categories">Back to Categories</Link>
                </Button>
            </nav>
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
        <section className="mx-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h1 className="text-lg font-bold">Edit Category</h1>
                <Button asChild variant="secondary">
                    <Link href="/admin/categories">Back to Categories</Link>
                </Button>
            </nav>
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
                                <FormControl>
                                    <Input type="color" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">
                    {isEditing ? 'Update Category' : 'Create Category'}
                </Button>
            </form>
        </Form>
    )
}
