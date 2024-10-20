"use client";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapFirst } from "@/app/_components/MapFirst";
import { formatDateToKorean } from "@/lib/utils";
import DetailSkeleton from "@/app/_components/skeleton/DetailSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/api";
import useLostPet from "@/store/lostPetStore";

interface ILost{
  author: string;
  description: string;
  gender: 'male' | 'female';
  gratuity: number;
  imageUrls:  {
    id: string;
    image: string;
  }[];
  phoneNum: string;
  place: string;
  time: string;
  title: string;
}

export default function LostDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const {toast} = useToast()
  const [post, setPost] = useState<ILost>()
  const setEditLostPetInfo = useLostPet((state) => state.setLostPetInfo)

  useEffect(() => {
    const getPosts = async () => await apiClient.get(`/post/${params.id}`).then((res) => {setPost(res.data.data); setEditLostPetInfo(res.data.data)})
    getPosts()
}, [])

const removePost = async (id:string) => {
  await apiClient.delete(`/post/${id}`)
  toast({
    title: "삭제 완료",
    description: "실종 게시글이 삭제되었습니다.",
  })
  router.push('/')
}


  if(!post) return <DetailSkeleton/>
  
  return (
    <div className="w-full h-full mb-[100px]">
      <div className="w-full flex justify-between mb-[50px]">
        <Link href="/">
          <Button size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/edit/${params.id}`)}>수정</Button>
          <Button variant="destructive" onClick={() => removePost(params.id)}>삭제</Button>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex w-full sm:justify-between sm:flex-row sm:items-start items-center flex-col gap-6">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {post.imageUrls.map((_, index) => (
                <CarouselItem key={index}>
                <div className="w-[300px] h-[300px] rounded-md relative">
                    <Image
                      src={post.imageUrls[index].image}
                      layout="fill"
                      alt="lost pet image"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex flex-col sm:h-full sm:justify-between sm:gap-0 gap-2">
            <div className="flex justify-between items-center w-[300px]">
              <span>작성자</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">{post.author}</div>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>연락처</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">{post.phoneNum}</div>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>위치</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">
                {post.place}
              </div>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>시간</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">{formatDateToKorean(post.time)}</div>
            </div>
          </div>
        </div>

        <div className="w-full h-[70px] bg-blue-100 rounded-md flex justify-start items-center px-4 text-sm">
          💡 {post.description}
        </div>

        <div className="w-full h-[400px] flex flex-col bg-gray-100 rounded-md">
        <div className="flex-col flex grow-1 rounded-t-md p-2 gap-1">
            <h1 className="font-bold">📍 실종 정보</h1>
            <div className="grid grid-cols-2 w-full gap-4">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">실종 위치</h1>
                <span className="text-sm">{post.place}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <MapFirst address={post.place}/>
          </div>
        </div>
      </div>
    </div>
  );
}
