// Packages
import parse from 'html-react-parser'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Actions
import { getPublishedPostBySlug } from '@/lib/posts'

// Components
import Badge from '@/components/Badge'
import { Button } from '@/components/ui/button'

// Assets
import testImage from '../../public/assets/test.png'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

type Props = {
    params: Promise<{ slug: string }>
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

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const postResult = await getPublishedPostBySlug(slug)

    const post = postResult?.data

    if (!post) notFound()

    return (
        <section className="rounded-lg border px-4">
            <nav className="float-right flex items-center justify-between p-6 px-2">
                <Button asChild variant="secondary">
                    <Link href="/">Back to Posts</Link>
                </Button>
            </nav>
            <div className="my-8 px-2">
                <p className="text-muted-foreground text-xs">
                    Published: {post?.publishedAt?.toLocaleDateString()}
                </p>
                <h1 className="text-2xl font-bold">{post?.title}</h1>
            </div>
            <div className="prose prose-sm lg:prose-lg mb-4 px-2">
                <Image
                    src={post.thumbnail ?? testImage}
                    alt={'Test image'}
                    width={500}
                    height={500}
                />
                <div className="my-4 flex gap-2">
                    <Badge
                        color={post.Category.color}
                        label={post.Category.name}
                    />
                </div>
                <div className="my-8">{post?.description}</div>
                {post?.content && (
                    <div className="prose">{parse(post?.content)}</div>
                )}
            </div>
        </section>
    )
}

export default PostPage
