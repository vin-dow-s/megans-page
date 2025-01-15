'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Category, Post } from '@/lib/types'
import testImage from '../../../app/public/assets/test.png'

type HomeClientProps = {
    posts: Post[]
    categories: Category[]
}

const HomeClient = ({ posts, categories }: HomeClientProps) => {
    const [filteredCategory, setFilteredCategory] = useState<number | null>(
        null,
    )

    const filteredPosts = filteredCategory
        ? posts.filter((post) => post.categoryId === filteredCategory)
        : posts

    const handleCategoryClick = (categoryId: number) => {
        setFilteredCategory((prev) => (prev === categoryId ? null : categoryId))
    }

    return (
        <>
            <div className="my-8 flex justify-center gap-10">
                {categories.map((category) => (
                    <Badge
                        key={category.id}
                        variant="outline"
                        className="cursor-pointer px-4 py-2"
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.name}
                    </Badge>
                ))}
            </div>
            <section className="grid grid-cols-3 gap-10">
                {filteredPosts
                    .toSorted((a, b) => b.id - a.id)
                    .map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        {post.publishedAt?.toLocaleDateString()}
                                    </p>
                                </div>
                                <Image
                                    src={post.image ?? testImage}
                                    alt={'Test image'}
                                    width={250}
                                    height={250}
                                />
                                <p>Category {post.Category?.name}</p>
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{post.title}</CardTitle>
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
        </>
    )
}

export default HomeClient
