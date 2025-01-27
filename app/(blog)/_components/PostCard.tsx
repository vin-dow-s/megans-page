// Packages
import Image from 'next/image'

// Types
import { Post } from '@/lib/types'

// Components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

// Assets
import testImage from '../../../app/public/assets/test.png'

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <Card>
            <CardHeader>
                <div>
                    <p className="text-muted-foreground text-xs">
                        {post.publishedAt?.toLocaleDateString()}
                    </p>
                </div>
                <Image
                    src={post.thumbnail || testImage}
                    alt={'Test image'}
                    width={250}
                    height={250}
                />
                <p>Category {post.Category?.name}</p>
            </CardHeader>
            <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardContent>
        </Card>
    )
}
