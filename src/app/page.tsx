"use client";

import { Button } from "@/app/_components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import image from "../static/image/banner.jpg";
import { ChevronRight } from "lucide-react";
import PetList from "@/app/_components/main/PetList";
import { useRouter } from "next/navigation";
import { PetListSkeleton } from "./_components/skeleton/PetListSkeleton";


export default function Home() {
  const [activeTabValue, setActiveTabValue] = useState<"lost" | "abandonment">("lost");
  const router = useRouter();  
  
  return (
    <div className="flex flex-col  w-full items-center gap-6">
      <div className="w-full flex justify-center">
        <div className="sm:w-[60%] w-[90%] h-[250px] rounded-md border flex">
          <div className="flex justify-center items-center relative w-full h-full ">
            <Image src={image} layout="fill" objectFit="contain" alt="banner image" placeholder="blur" />
          </div>
          <div className="w-full h-full md:p-6 p-3 flex flex-col justify-center items-end md:gap-6 gap-3 break-keep">
            <p className="font-bold md:text-xl lg:text-2xl text-sm">
              반려 동물 실종 시
              <br />
              소중한 골든타임에 필요한
              <br />
              가이드를 제공합니다.
            </p>
            <div className="w-full flex justify-end">
              <Button variant="outline">
                가이드
                <ChevronRight size="18" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex xs:flex-row flex-col-reverse gap-3 w-full justify-center items-center">
        <Tabs defaultValue={activeTabValue} className="flex justify-center">
          <TabsList>
            <TabsTrigger value="lost" onClick={() => setActiveTabValue("lost")} className="xs:text-base text-sm">
              실종 동물
            </TabsTrigger>
            <TabsTrigger value="abandonment" onClick={() => setActiveTabValue("abandonment")} className="xs:text-base text-sm">
              유기 동물
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {activeTabValue === "lost" && (
          <Button size="default" className="xs:absolute xs:right-0 xs:text-base text-sm" onClick={() => router.push('/register')}>실종 동물 등록</Button>
        )}
      </div>
      {activeTabValue === "abandonment" ? <PetList /> : <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6"><PetListSkeleton/></div>}

    </div>
  );
}
