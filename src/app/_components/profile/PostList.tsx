'use client'
import { useEffect, useState } from "react"
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import CardSkeleton from "../skeleton/CardSkeleton";
import apiClient from "@/lib/api";
import { formatDateToKorean } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";

interface IPost{
    author: string;
    gratuity: number;
    place: string;
    thumbnail: string;
    time: string;
    title: string;
    id: string;
    missingAnimalStatus: "SEARCHING" | "FOUND" | "SEEN";
}

export default function PostList(){
    const {toast} = useToast()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const onSubmit = async (post: IPost) => {
        const status = post.missingAnimalStatus === "SEARCHING" ? "FOUND" : "SEARCHING"
        const queryParams = new URLSearchParams({
            postId: post.id,
            missingAnimalStatus: status
          });

        await apiClient.patch(
          `/post/renewal-status?${queryParams.toString()}`)
        .then(() => { 
            toast({
              title: "수정 완료",
              description: "상태가 수정되었습니다.",
            })
        })  
      };
    
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
                        
                            <Card className="h-[300px] sm:w-[250px] w-full hover:cursor-pointer" key={post.id}>
                                <Link href={`lost/${post.id}`}>
                                    <div className="h-[200px] rounded-md flex justify-center relative">
                                        {
                                            post.thumbnail ? <Image src={post.thumbnail} layout="fill" alt="abandonment pet image" className="rounded-t-lg object-cover" /> :  <div className="flex justify-center items-center font-bold">NO IMAGE</div>
                                        }
                                    </div>
                                </Link>
                                <div className="p-2">
                                    <div className="flex gap-1 my-2 text-sm">
                                        {post.title}
                                    </div>
                                    <div className="flex justify-between">
                                        <Badge>
                                            {formatDateToKorean(post.time)}
                                        </Badge>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="text-xs" onClick={(event) => {event.stopPropagation();}}>상태 변경</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                <DialogTitle>상태 변경</DialogTitle>
                                                </DialogHeader>
                                                    <Label htmlFor="name" className="text-left">
                                                    {post.missingAnimalStatus === "SEARCHING" ? "완료 상태로 변경하시겠습니까?" : "실종 상태로 변경하시겠습니까?"}
                                                    </Label>
                                                <DialogClose className="flex justify-end">
                                                <Button type="submit" onClick={() => onSubmit(post)}>변경</Button>
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </Card>
                    )
                })
            }
        </div>
    )
}