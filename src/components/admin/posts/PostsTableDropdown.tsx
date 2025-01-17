'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCustomToast } from '@/hooks/useSuccessToast'
import { deletePost, updatePost } from '@/lib/posts'
import { isActionSuccessful } from '@/lib/safe-action'
import { Post } from '@/lib/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { BookOpenCheck, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

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
        if (confirm('Are you sure you want to delete this post?')) {
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
    }

    const statusText = post.isPublished ? 'Unpublish' : 'Publish'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="size-8 p-0 hover:bg-gray-200"
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
                    onClick={handleDeletePost}
                    className="gap-4 p-2 text-red-600 focus:text-red-600"
                >
                    <Trash />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PostsTableDropdown
