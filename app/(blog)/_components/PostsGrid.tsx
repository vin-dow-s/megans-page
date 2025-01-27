// Packages
import Link from 'next/link'

// Types
import { Post } from '@/lib/types'

// Components
import { PostCard } from './PostCard'

type PostsGridProps = {
    posts: Post[]
}

const PostsGrid = ({ posts }: PostsGridProps) => {
    return (
        <section className="grid grid-cols-3 gap-10">
            {posts
                .toSorted((a, b) => b.id - a.id)
                .map((post) => (
                    <Link href={`/${post.slug}`} key={post.id}>
                        <PostCard post={post} />
                    </Link>
                ))}
        </section>
    )
}

export default PostsGrid
