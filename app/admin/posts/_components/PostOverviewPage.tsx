'use client'

// Packages
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Components
import Badge from '@/components/Badge'
import { Button } from '@/components/ui/button'

// Types
import { Post } from '@/lib/types'

// Assets
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
                    <div className="text-muted-foreground flex items-center text-xs">
                        {post?.publishedAt?.toLocaleDateString()} - &nbsp;
                        {post?.isPublished ? (
                            <Badge color="green" label="Published" />
                        ) : (
                            <Badge color="darkgrey" label="Draft" />
                        )}
                    </div>
                </div>
                <h1 className="py-4 text-2xl">{post?.title}</h1>
                <Image
                    src={post?.thumbnail || testImage}
                    alt={'Test Image'}
                    width={500}
                    height={500}
                />
                <div className="my-4 flex gap-2">
                    <span className="font-semibold">Category:</span>
                    <Badge
                        color={post.Category.color}
                        label={post.Category.name}
                    />
                </div>
                <div className="my-4">
                    <span className="font-semibold">Description:</span>{' '}
                    {post?.description}
                </div>
                <div className="my-4">
                    <span className="font-semibold">Slug:</span> {post?.slug}
                </div>
                {post?.content && (
                    <div className="prose">
                        <span className="font-semibold">Content:</span>{' '}
                        {parse(sanitizedContent)}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PostOverviewPage
