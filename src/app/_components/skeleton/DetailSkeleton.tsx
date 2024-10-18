"use client";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function DetailSkeleton() {
  
  return (
    <div className="w-full h-full mb-[100px]">
      <div className="w-full flex justify-between mb-[50px]">
          <Button size="icon">
            <ArrowLeft />
          </Button>
      </div>

      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex w-full sm:justify-between sm:flex-row sm:items-start items-center flex-col gap-6">
          <Skeleton className="w-[300px] h-[300px] rounded-md relative" />
          <div className="flex flex-col sm:h-full sm:justify-between sm:gap-0 gap-2">
            <div className="flex justify-between items-center w-[300px]">
              <span>작성자</span>
              <Skeleton className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center"/>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>연락처</span>
              <Skeleton className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center"/>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>위치</span>
              <Skeleton className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center"/>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>시간</span>
              <Skeleton className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center"/>
            </div>
          </div>
        </div>

        <Skeleton className="w-full h-[70px] bg-blue-100 rounded-md flex justify-start items-center px-4 text-sm"/>
        <div className="w-full h-[400px] flex flex-col bg-gray-100 rounded-md">
        <div className="flex-col flex grow-1 rounded-t-md p-2 gap-1">
            <h1 className="font-bold">📍 실종 정보</h1>
            <div className="grid grid-cols-2 w-full gap-4">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">실종 위치</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
