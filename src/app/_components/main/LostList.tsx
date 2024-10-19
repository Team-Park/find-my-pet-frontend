"use client";

import { useEffect, useState } from "react";
import { PetListSkeleton } from "../skeleton/PetListSkeleton";
import AbandonmentPagination from "../AbandonmentPagination";
import LocalStorage from "@/lib/localStorage";
import LostCard from "../LostCard";
import Link from "next/link";

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
  const AT = LocalStorage.getItem('at')?.replace(/"/g, '');

  useEffect(() => {
    const getPosts = async() => {
        setIsLoading(true)
        const data = await fetch(`https://find-my-pet.duckdns.org/api/v1/posts?pageSize=${9}&pageOffset=${((currentPage-1)*2)}&orderBy=CREATED_AT_DESC`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${AT}`

            }
        })
        .then((res) => res.json())
        setLostPetList(data.data.contents)
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
