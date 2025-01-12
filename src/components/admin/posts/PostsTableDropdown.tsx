'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deletePost, updatePost } from '@/lib/posts'
import { Post } from '@/lib/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { BookOpenCheck, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'

type PostsTableDropdownProps = Readonly<{
    post: Post
    onStatusChange: (updatedPost: Post) => void
    onPostDelete: (deletedPost: Post) => void
}>

const PostsTableDropdown = ({
    post,
    onStatusChange,
    onPostDelete,
}: PostsTableDropdownProps) => {
    const handlePublishToggle = async () => {
        try {
            const updatedPost = await updatePost(post.id, {
                isPublished: !post.isPublished,
            })
            onStatusChange(updatedPost)
        } catch (error) {
            console.error('Error updating post status:', error)
        }
    }

    const handleDeletePost = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const deletedPost = await deletePost(post.id)
                onPostDelete(deletedPost)
            } catch (error) {
                console.error('Error deleting post:', error)
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
