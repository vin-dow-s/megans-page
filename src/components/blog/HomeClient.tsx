'use client'

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Category, Post } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import testImage from '../../../app/public/assets/test.png'

type HomeClientProps = {
    posts: Post[]
    categories: Category[]
    currentCategory?: Category
}

const HomeClient = ({
    posts,
    categories,
    currentCategory,
}: HomeClientProps) => {
    const router = useRouter()

    const handleCategoryClick = (categoryName: string) => {
        if (
            currentCategory?.name.toLowerCase() === categoryName.toLowerCase()
        ) {
            router.push('/blog')
        } else {
            router.push(`/blog/category/${categoryName.toLowerCase()}`)
        }
    }

    return (
        <>
            <div className="my-8 flex justify-center gap-10">
                {categories.map((category) => {
                    const isActive = category.name === currentCategory?.name
                    const variant = isActive ? 'default' : 'outline'

                    return (
                        <Badge
                            key={category.id}
                            variant={variant}
                            className={`cursor-pointer px-4 py-2 text-sm font-medium ${
                                variant === 'outline' ? 'hover:bg-gray-100' : ''
                            }`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            {category.name}
                        </Badge>
                    )
                })}
            </div>
            <section className="grid grid-cols-3 gap-10">
                {posts
                    .toSorted((a, b) => b.id - a.id)
                    .map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id}>
                            <Card>
                                <CardHeader>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            {post.publishedAt?.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Image
                                        src={post.thumbnail ?? testImage}
                                        alt={'Test image'}
                                    />
                                    <p>Category {post.Category?.name}</p>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardDescription>
                                        {post.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
            </section>
        </>
    )
}

export default HomeClient
