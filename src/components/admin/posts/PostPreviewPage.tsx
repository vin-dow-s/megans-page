'use client'

// Packages
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Components
import Badge from '@/components/Badge'

// Types
import { Post } from '@/lib/types'

// Assets
import { ArrowLeftIcon } from 'lucide-react'
import defaultThumbnail from '../../../../public/assets/default-thumbnail.webp'

type PostPreviewPageProps = {
    post: Post
}

const PostPreviewPage = ({ post }: PostPreviewPageProps) => {
    const [sanitizedContent, setSanitizedContent] = useState<string>('')

    useEffect(() => {
        if (post.content) {
            setSanitizedContent(DOMPurify.sanitize(post.content))
        }
    }, [post.content])

    return (
        <section className="mx-4 rounded-sm border-none bg-white p-4">
            <div className="mb-4 flex gap-10">
                <Link href={`/admin/posts`} className="category-link">
                    <div className="flex items-center gap-1 font-normal">
                        <ArrowLeftIcon size={14} /> Back
                    </div>
                </Link>
            </div>
            <h2 className="p-4 px-2 text-xl font-bold">Post Preview</h2>
            <div className="px-2">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-8 text-xs font-light">
                        <p>
                            {post?.isPublished ? (
                                <Badge color="green" label="Published" />
                            ) : (
                                <Badge color="darkgrey" label="Draft" />
                            )}
                        </p>
                        <p>
                            Last updated: {post.updatedAt?.toLocaleDateString()}
                        </p>
                        <p>
                            First published:{' '}
                            {post.publishedAt?.toLocaleDateString()}
                        </p>
                    </div>
                    <div className="tracking-tight">
                        <h1 className="text-4xl">{post.title}</h1>
                    </div>
                </div>
                <div className="my-4">
                    <Image
                        src={post?.thumbnail ?? defaultThumbnail}
                        alt={'Post thumbnail'}
                        width={250}
                        height={250}
                    />
                </div>
                <div className="my-4 flex gap-2">
                    <span className="font-semibold">Category:</span>
                    <Badge
                        color={post.Category.color}
                        label={post.Category.name}
                    />
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Slug:</span> {post?.slug}
                </div>
                <div className="my-4 italic">
                    <span className="font-semibold not-italic">
                        Description:
                    </span>{' '}
                    {post?.description}
                </div>
                {post?.content && (
                    <div className="prose my-4">
                        <span className="font-semibold">Content:</span>{' '}
                        {parse(sanitizedContent)}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PostPreviewPage
