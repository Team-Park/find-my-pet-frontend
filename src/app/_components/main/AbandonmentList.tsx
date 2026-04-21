"use client";

import { useEffect, useState } from "react";
import AbandonmentCard from "../AbandonmentCard";
import { PetListSkeleton } from "../skeleton/PetListSkeleton";
import { useRouter } from "next/navigation";
import AbandonmentPagination from "../AbandonmentPagination";
import apiClient from "@/lib/api";

export interface IPet {
  desertionNo: string;
  filename: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd?: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn?: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm?: string;
  chargeNm?: string;
  officetel?: string;
  /** 백엔드가 upkind 로 분류해 채운 값 (DOG/CAT/OTHER) */
  animalType?: "DOG" | "CAT" | "OTHER";
}

type AnimalFilter = "ALL" | "DOG" | "CAT";

export default function AbandonmentList() {
  const router = useRouter();
  const [abandonmentPetList, setAbandonmentPetList] = useState<IPet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<AnimalFilter>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.get("/abandoned-animals", {
          params: {
            pageNo: currentPage,
            numOfRows: 20,
            ...(filter !== "ALL" ? { animalType: filter } : {}),
          },
        });
        // 응답: { data: { contents: [...], hasNextPage, totalCount } }
        setAbandonmentPetList(data?.data?.contents ?? []);
      } catch (e) {
        console.error("구조동물 조회 실패", e);
        setAbandonmentPetList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, filter]);

  const tabClass = (key: AnimalFilter) =>
    `px-4 py-2 text-sm rounded-full transition-colors ${
      filter === key
        ? "bg-blue-500 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button className={tabClass("ALL")} onClick={() => { setFilter("ALL"); setCurrentPage(1); }}>
          전체
        </button>
        <button className={tabClass("DOG")} onClick={() => { setFilter("DOG"); setCurrentPage(1); }}>
          개
        </button>
        <button className={tabClass("CAT")} onClick={() => { setFilter("CAT"); setCurrentPage(1); }}>
          고양이
        </button>
      </div>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
        {isLoading ? (
          <PetListSkeleton />
        ) : (
          abandonmentPetList.map((pet: IPet) => (
            <div
              key={pet.desertionNo}
              onClick={() => {
                router.push(`/abandonment/${pet.desertionNo}`);
                localStorage.setItem("petInfo", JSON.stringify(pet));
              }}
            >
              <AbandonmentCard {...pet} key={pet.desertionNo} />
            </div>
          ))
        )}
      </div>
      <AbandonmentPagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
