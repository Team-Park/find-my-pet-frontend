"use client";

import { useEffect, useState } from "react";
import { PetListSkeleton } from "../skeleton/PetListSkeleton";
import LostCard from "../LostCard";
import Link from "next/link";
import apiClient from "@/lib/api";
import LostPagination from "../LostPagination";
import { ITEM_PER_PAGE } from "@/app/constant/constant";

export interface ILostPet {
    author: string;
    gratuity: number;
    id: string;
    place: string;
    thumbnail: string;
    time: string;
    title: string;
    description: string;
}

export default function LostList() {
  const [lostPetList, setLostPetList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getPosts = async() => {
        setIsLoading(true)
        const res = await apiClient.get(`/posts?pageSize=${ITEM_PER_PAGE}&pageOffset=${((currentPage-1))}&orderBy=CREATED_AT_DESC`)
        setLostPetList(res.data.data.contents)
        setTotalCount(res.data.data.totalCount)
        setIsLoading(false);
    }
    getPosts()
}, [currentPage])
  return (
    <div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {isLoading ? 
          <PetListSkeleton/>
          :
          lostPetList.map((pet: ILostPet) => {
            return (
                <Link href={`/lost/${pet.id}`} key={pet.id}>
                  <LostCard {...pet} />
                </Link>
              );
          })
        }
      </div>
      <LostPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalCount}/>
    </div>
  );
}
