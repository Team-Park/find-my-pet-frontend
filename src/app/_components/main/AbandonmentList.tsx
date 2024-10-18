"use client";

import { useEffect, useState } from "react";
import AbandonmentCard from "../AbandonmentCard";
import { PetListSkeleton } from "../skeleton/PetListSkeleton";
import { useRouter } from "next/navigation";
import AbandonmentPagination from "../AbandonmentPagination";

export interface IPet {
  desertionNo: string;
  filename: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
}

export default function AbandonmentList() {
  const router = useRouter()
  const [abandonmentPetList, setAbandonmentPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_KEY!}&pageNo=${currentPage}`).then((res) => res.json());
      setAbandonmentPetList(data.response.body.items.item);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
        {isLoading ? 
          <PetListSkeleton/>
          :
          abandonmentPetList.map((pet: IPet) => {
            return (
                <div key={pet.desertionNo} onClick={() => { 
                  router.push(`/abandonment/${pet.desertionNo}`)
                  localStorage.setItem('petInfo',JSON.stringify(pet))
                }}>
                  <AbandonmentCard {...pet} key={pet.desertionNo} />
                </div>
              );
          })
        }
      </div>
      <AbandonmentPagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}
