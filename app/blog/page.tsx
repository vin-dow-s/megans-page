import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getPublishedPosts } from '@/lib/posts'
import Image from 'next/image'
import Link from 'next/link'
import testImage from '../public/assets/test.png'

const Home = async () => {
    const result = await getPublishedPosts()

    if (!result) {
        return (
            <section className="mx-4 rounded-lg border px-4">
                <h2 className="text-lg font-bold">Failed to load posts</h2>
            </section>
        )
    }

    const posts = result?.data || []

    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
            {posts
                ?.toSorted((a, b) => b.id - a.id)
                .map((post) => (
                    <Card key={post.title}>
                        <CardHeader>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    {post.publishedAt?.toLocaleDateString()}
                                </p>
                            </div>
                            <Image
                                src={testImage}
                                alt={'Test image'}
                                width={250}
                                height={250}
                            />
                            <p>Category {post.Category?.name}</p>
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Title {post.title}</CardTitle>
                            <CardDescription>
                                {post.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Link
                                className="text-blue-500 hover:underline"
                                href={`/blog/${post.slug}`}
                            >
                                Read more
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
        </section>
    )
}

export default Home
