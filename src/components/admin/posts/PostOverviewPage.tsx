'use client'

import Badge from '@/components/Badge'
import { Button } from '@/components/ui/button'
import { Post } from '@/lib/types'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import testImage from '../../../../app/public/assets/test.png'

type PostOverviewPageProps = {
    post: Post
}

const PostOverviewPage = ({ post }: PostOverviewPageProps) => {
    const [sanitizedContent, setSanitizedContent] = useState<string>('')

    useEffect(() => {
        if (post.content) {
            setSanitizedContent(DOMPurify.sanitize(post.content))
        }
    }, [post.content])

    return (
        <section className="mx-4 rounded-lg border px-4">
            <nav className="flex items-center justify-between p-6 px-2 pb-12">
                <h2 className="text-lg font-bold">Post Overview</h2>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <div className="prose mb-4 px-2">
                <div>
                    <div className="mb-4 flex items-center text-xs text-muted-foreground">
                        {post?.publishedAt?.toLocaleDateString()} - &nbsp;
                        {post?.isPublished ? (
                            <Badge color="green" label="Published" />
                        ) : (
                            <Badge color="darkgrey" label="Draft" />
                        )}
                    </div>
                </div>
                <h1>{post?.title}</h1>
                <Image
                    src={testImage}
                    alt={'Test Image'}
                    width={250}
                    height={250}
                />
                <div className="my-4 flex gap-2">
                    Category:
                    <Badge
                        color={post.Category.color}
                        label={post.Category.name}
                    />
                </div>
                <div className="my-4">Description: {post?.description}</div>
                <div className="my-4">Slug: {post?.slug}</div>
                {post?.content && (
                    <div className="prose">
                        Content: {parse(sanitizedContent)}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PostOverviewPage
