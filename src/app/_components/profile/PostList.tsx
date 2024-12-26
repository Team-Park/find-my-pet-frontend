'use client'
import { useEffect, useState } from "react"
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import CardSkeleton from "../skeleton/CardSkeleton";
import apiClient from "@/lib/api";
import { formatDateToKorean } from "@/lib/utils";

interface IPost{
    author: string;
    gratuity: number;
    place: string;
    thumbnail: string;
    time: string;
    title: string;
    id: string;
}

export default function PostList(){
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getPosts = async() => {
                setIsLoading(true)
                await apiClient.get('/posts/mine')
            .then((res) => {setPosts(res.data.data); setIsLoading(false)})
        }
        getPosts()
        
    }, [])

    if(isLoading === true) return (
        <div className="flex justify-between w-full flex-wrap gap-6">
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
        </div>
    )
    if(posts.length === 0 && isLoading === false) return <span className="font-bold text-lg w-full text-center">💡 작성한 글이 없습니다.</span>

    return (
        <div className="w-full flex sm:flex-wrap sm:flex-row flex-col gap-8">
            {
                posts.map((post:IPost) => {
                    return (
                        <Link href={`lost/${post.id}`} key={post.id}>
                            <Card className="h-[300px] sm:w-[250px] w-full hover:cursor-pointer">
                                <div className="h-[200px] rounded-md flex justify-center relative">
                                    {
                                        post.thumbnail ? <Image src={post.thumbnail} layout="fill" alt="abandonment pet image" className="rounded-t-lg object-cover" /> :  <div className="flex justify-center items-center font-bold">NO IMAGE</div>
                                    }
                                </div>
                                <div className="p-2">
                                    <div className="flex gap-1 my-2 text-sm">
                                        {post.title}
                                    </div>
                                    <Badge>
                                        {formatDateToKorean(post.time)}
                                    </Badge>
                                </div>
                            </Card>
                        </Link>
                    )
                })
            }
        </div>
    )
}