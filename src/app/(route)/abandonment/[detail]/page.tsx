"use client";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IPet } from "@/app/_components/main/PetList";
import LocalStorage from "@/lib/localStorage";
import { MapFirst } from "@/app/_components/MapFirst";
import { MapSecond } from "@/app/_components/MapSecond";

export default function AbandonmentDetail() {
  const petInfo:IPet = JSON.parse(LocalStorage.getItem('petInfo')!)
  return (
    <div className="w-full h-full mb-[100px]">
      <div className="w-full flex justify-between mb-[50px]">
        <Link href="/">
          <Button size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button>찾음</Button>
          <Button>수정</Button>
          <Button variant="destructive">삭제</Button>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex w-full sm:justify-between sm:flex-row sm:items-start items-center flex-col gap-6">
          <div className="w-[300px] h-[300px] rounded-md relative">
            <Image
              src={petInfo.filename}
              layout="fill"
              alt="abandonment pet image"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col sm:h-full sm:justify-between sm:gap-0 gap-2">
            <div className="flex justify-between items-center w-[300px]">
              <span>품종</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">{petInfo.kindCd}</div>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>성별</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">{petInfo.sexCd}</div>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>나이</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">
                {petInfo.age}
              </div>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span>체중</span>
              <div className="w-[250px] h-[50px] rounded-md bg-gray-100 flex justify-center items-center">{petInfo.weight}</div>
            </div>
          </div>
        </div>

        <div className="w-full h-[70px] bg-blue-100 rounded-md flex justify-start items-center px-4 text-sm">
          💡 {petInfo.specialMark}
        </div>

        <div className="w-full h-[400px] flex flex-col bg-gray-100 rounded-md">
          <div className="flex-col flex grow-1 rounded-t-md p-2 gap-1">
            <h1 className="font-bold">📍 발견 위치</h1>
            <h1 className="text-sm flex">{petInfo.happenPlace}</h1>
          </div>
          <div className="w-full h-full">
            <MapFirst address={petInfo.happenPlace}/>
          </div>
        </div>

        <div className="w-full h-[400px] flex flex-col bg-gray-100 rounded-md">
          <div className="flex-col flex grow-1 rounded-t-md p-2 gap-1">
            <h1 className="font-bold">📍 보호소 정보</h1>
            <div className="grid grid-cols-2 w-full gap-4">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">보호소</h1>
                <span className="text-sm">{petInfo.careNm}</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">주소</h1>
                <span className="text-sm">
                  {petInfo.careAddr}
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">담당자</h1>
                <span className="text-sm">{petInfo.chargeNm}</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">연락처</h1>
                <span className="text-sm">{petInfo.careTel}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <MapSecond address={petInfo.careAddr}/>
          </div>
        </div>
      </div>
    </div>
  );
}
