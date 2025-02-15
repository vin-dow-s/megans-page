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
import defaultThumbnail from '../../../public/assets/default-thumbnail.webp'

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <Card className="group flex flex-col justify-between rounded-sm border-none bg-white p-6 shadow-xs transition duration-100 ease-in-out hover:bg-(--color-hover-grey) lg:aspect-square">
            <CardHeader className="p-0">
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-light">
                        {post.publishedAt?.toLocaleDateString()}
                    </p>
                    <CardTitle className="max-lg:mb-6">
                        <h2 className="text-2xl font-normal">{post.title}</h2>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex items-end justify-between p-0 leading-none">
                <CardDescription className="leading-none font-light text-(--color-text-main)">
                    {post.Category.name}
                </CardDescription>
                <div className="h-[50px] w-[50px] overflow-hidden sm:h-[75px] sm:w-[75px] lg:h-[125px] lg:w-[125px] xl:h-[150px] xl:w-[150px]">
                    <Image
                        src={post.thumbnail || defaultThumbnail}
                        alt="Post thumbnail"
                        width={150}
                        height={150}
                        className="h-full w-full rounded-xs object-cover grayscale filter transition duration-150 ease-in-out group-hover:grayscale-0"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
