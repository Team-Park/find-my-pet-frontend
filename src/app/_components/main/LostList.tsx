"use client";

import { useEffect, useState } from "react";
import { PetListSkeleton } from "../skeleton/PetListSkeleton";
import AbandonmentPagination from "../AbandonmentPagination";
import LostCard from "../LostCard";
import Link from "next/link";
import apiClient from "@/lib/api";

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async() => {
        setIsLoading(true)
        const res = await apiClient.get(`/posts?pageSize=${9}&pageOffset=${((currentPage-1))}&orderBy=CREATED_AT_DESC`)
        setLostPetList(res.data.data.contents)
        setIsLoading(false);
    }
    getPosts()
}, [currentPage])
  return (
    <div>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
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
      <AbandonmentPagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}
