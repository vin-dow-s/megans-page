// Packages
import parse from 'html-react-parser'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Actions
import { getPublishedPostBySlug } from '@/lib/posts'

// Components

// Assets
import { ArrowLeftIcon } from 'lucide-react'
import testImage from '../../../public/assets/test.png'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ category?: string }>
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const { slug } = await params
    const postResult = await getPublishedPostBySlug(slug)

    const post = postResult?.data

    if (!post) {
        return {
            title: 'Post Not Found - My Blog',
            description: 'Sorry, this post does not exist.',
        }
    }

    return {
        title: `${post.title} - Blog Test`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${SITE_URL}/${post.slug}`,
            type: 'article',
            images: [
                {
                    url: post.thumbnail ?? '/default-thumbnail.jpg',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.thumbnail ?? '/default-thumbnail.jpg'],
        },
    }
}

const PostPage = async ({ params, searchParams }: Props) => {
    const { slug } = await params
    const { category } = await searchParams

    const postResult = await getPublishedPostBySlug(slug)

    const post = postResult?.data

    if (!post) notFound()

    return (
        <>
            <div className="mb-4 flex gap-10">
                <Link
                    href={category ? `/category/${category}` : '/'}
                    className="category-link"
                >
                    <div className="flex items-center gap-1 font-normal">
                        <ArrowLeftIcon size={14} /> Back
                    </div>
                </Link>
            </div>
            <section className="rounded-sm bg-white p-6">
                <div className="p-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-8">
                            <span className="text-xs font-light">
                                Last updated:{' '}
                                {post.updatedAt?.toLocaleDateString()}
                            </span>
                            <span className="text-xs font-light">
                                First published:{' '}
                                {post.publishedAt?.toLocaleDateString()}
                            </span>
                        </div>
                        <div className="tracking-tight">
                            <h2 className="text-4xl">{post.title}</h2>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <Image
                        src={post.thumbnail ?? testImage}
                        alt={'Test image'}
                        width={250}
                        height={250}
                    />
                    <div className="my-8 italic">{post?.description}</div>
                    {post?.content && (
                        <div className="prose">{parse(post?.content)}</div>
                    )}
                </div>
            </section>
        </>
    )
}

export default PostPage
