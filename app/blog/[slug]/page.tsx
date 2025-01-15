import Badge from '@/components/Badge'
import { Button } from '@/components/ui/button'
import { getPostBySlug } from '@/lib/posts'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import testImage from '../../public/assets/test.png'

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const postResult = await getPostBySlug(slug)

    const post = postResult?.data

    if (!post) notFound()

    return (
        <section className="rounded-lg border px-4">
            <nav className="flex items-center justify-between p-8 px-2 pb-6">
                <h1 className="text-lg font-bold">{post?.title}</h1>
                <Button asChild variant="secondary">
                    <Link href="/blog">Back to Posts</Link>
                </Button>
            </nav>
            <div className="prose prose-sm lg:prose-lg px-2">
                <div>
                    <p className="text-xs text-muted-foreground">
                        {post?.publishedAt?.toLocaleDateString()}
                    </p>
                </div>
                <Image
                    src={post.thumbnail ?? testImage}
                    alt={'Test image'}
                    width={250}
                    height={250}
                />
                <div className="my-4 flex gap-2">
                    <Badge
                        color={post.Category.color}
                        label={post.Category.name}
                    />
                </div>
                <div className="my-4">Description: {post?.description}</div>
                {post?.content && (
                    <div className="prose">Content: {parse(post?.content)}</div>
                )}
            </div>
        </section>
    )
}

export default PostPage
