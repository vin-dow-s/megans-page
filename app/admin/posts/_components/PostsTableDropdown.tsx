'use client'

// Packages
import Link from 'next/link'
import { useState } from 'react'

// Components
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Types
import { Post } from '@/lib/types'

// Hooks
import { useCustomToast } from '@/hooks/useCustomToast'

// Actions
import { deletePost, updatePost } from '@/lib/posts'
import { isActionSuccessful } from '@/lib/safe-action'

// Icons
import ConfirmationDialog from '@/components/AlertDialog'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { BookOpenCheck, Pencil, Trash } from 'lucide-react'

type PostsTableDropdownProps = Readonly<{
    post: Post
    onStatusChange: (updatedPostId: number, updatedData: Partial<Post>) => void
    onPostDelete: (deletedPostId: number) => void
}>

const PostsTableDropdown = ({
    post,
    onStatusChange,
    onPostDelete,
}: PostsTableDropdownProps) => {
    const { displaySuccessToast, displayErrorToast } = useCustomToast()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handlePublishToggle = async () => {
        try {
            const result = await updatePost({
                id: post.id,
                data: { isPublished: !post.isPublished },
            })

            if (!isActionSuccessful(result)) {
                console.error(
                    'Error updating post status:',
                    result?.serverError,
                )
                displayErrorToast(
                    result?.serverError ?? 'Failed to update post status.',
                )
                return
            }

            onStatusChange(post.id, { isPublished: !post.isPublished })

            displaySuccessToast(
                `Post successfully ${post.isPublished ? 'unpublished' : 'published'}.`,
            )
        } catch (error) {
            console.error('Error updating post status:', error)
            displayErrorToast(`Failed to update the post status.`)
        }
    }

    const handleDeletePost = async () => {
        try {
            const result = await deletePost(post.id)

            if (!isActionSuccessful(result)) {
                console.error('Error deleting post:', result?.serverError)
                displayErrorToast(
                    result?.serverError ?? 'Failed to delete post.',
                )
                return
            }

            onPostDelete(post.id)

            displaySuccessToast(`Post successfully deleted.`)
        } catch (error) {
            console.error('Error deleting post:', error)
            displayErrorToast(`Failed to delete the post.`)
        }
    }

    const statusText = post.isPublished ? 'Unpublish' : 'Publish'

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="size-8 cursor-pointer p-0 hover:bg-gray-200"
                    >
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild className="gap-4 p-2">
                        <Link href={`/admin/posts/${post.id}/edit`}>
                            <Pencil />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handlePublishToggle}
                        className="gap-4 p-2"
                    >
                        <BookOpenCheck />
                        {statusText}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setIsDialogOpen(true)}
                        className="gap-4 p-2 text-red-600 focus:text-red-600"
                    >
                        <Trash />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDeletePost}
                title="Confirm Deletion"
                description="Are you sure you want to delete this post? This action cannot be undone."
            />
        </>
    )
}

export default PostsTableDropdown
