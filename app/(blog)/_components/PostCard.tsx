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
                <div className="flex items-center">
                    <p className="text-muted-foreground text-xs">
                        {post.publishedAt?.toLocaleDateString()} - Category{' '}
                        {post.Category?.name}
                    </p>
                </div>
                <Image
                    src={post.thumbnail ?? testImage}
                    alt={'Test image'}
                    width={500}
                    height={500}
                />
            </CardHeader>
            <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardContent>
        </Card>
    )
}
