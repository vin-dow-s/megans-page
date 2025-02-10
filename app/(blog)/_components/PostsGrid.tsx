// Packages
import Link from 'next/link'

// Types
import { Category, Post } from '@/lib/types'

// Components
import { PostCard } from './PostCard'

type PostsGridProps = {
    posts: Post[]
    currentCategory?: Category
}

const PostsGrid = ({ posts, currentCategory }: PostsGridProps) => {
    return (
        <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {' '}
            {posts
                .toSorted((a, b) => b.id - a.id)
                .map((post) => (
                    <Link
                        href={
                            currentCategory
                                ? `/${post.slug}?category=${currentCategory.name.toLowerCase().replace(/\s+/g, '-')}`
                                : `/${post.slug}`
                        }
                        key={post.id}
                    >
                        <PostCard post={post} />
                    </Link>
                ))}
        </section>
    )
}

export default PostsGrid
