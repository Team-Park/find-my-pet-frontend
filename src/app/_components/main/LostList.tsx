"use client";

import { useEffect, useState } from "react";
import { PetListSkeleton } from "../skeleton/PetListSkeleton";
import LostCard from "../LostCard";
import Link from "next/link";
import apiClient from "@/lib/api";
import LostPagination from "../LostPagination";
import { ITEM_PER_PAGE } from "@/app/constant/constant";
import NearbyFilter, { type NearbySetting } from "./NearbyFilter";
import AdSlot from "../ads/AdSlot";

/** 홈 피드 카드 몇 장마다 1번 광고 슬롯 삽입. */
const AD_INTERVAL = 6;

export interface ILostPet {
  author: string;
  gratuity: number;
  id: string;
  place: string;
  thumbnail: string;
  time: string;
  title: string;
  description: string;
  missingAnimalStatus: "SEARCHING" | "FOUND" | "SEEN";
  distanceKm?: number;
}

export default function LostList() {
  const [lostPetList, setLostPetList] = useState<ILostPet[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nearby, setNearby] = useState<NearbySetting>({ enabled: false });

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        if (nearby.enabled) {
          const res = await apiClient.get(`/posts/nearby`, {
            params: {
              lat: nearby.lat,
              lng: nearby.lng,
              radiusKm: nearby.radiusKm,
              pageSize: ITEM_PER_PAGE,
              pageOffset: currentPage - 1,
            },
          });
          setLostPetList(res.data?.data?.contents ?? []);
          setTotalCount(res.data?.data?.totalCount ?? 0);
        } else {
          const res = await apiClient.get(
            `/posts?pageSize=${ITEM_PER_PAGE}&pageOffset=${currentPage - 1}&orderBy=CREATED_AT_DESC`,
          );
          setLostPetList(res.data?.data?.contents ?? []);
          setTotalCount(res.data?.data?.totalCount ?? 0);
        }
      } catch {
        setLostPetList([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [currentPage, nearby]);

  return (
    <div className="w-full flex flex-col justify-center">
      <NearbyFilter
        value={nearby}
        onChange={(v) => {
          setCurrentPage(1);
          setNearby(v);
        }}
      />
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {isLoading ? (
          <PetListSkeleton />
        ) : (
          lostPetList.flatMap((pet, idx) => {
            const node = (
              <Link href={`/lost/${pet.id}`} key={pet.id}>
                <LostCard {...pet} />
              </Link>
            );
            // 카드 AD_INTERVAL 개마다 광고 1개 삽입 (맨 앞/마지막 제외)
            const shouldInjectAd =
              idx > 0 && (idx + 1) % AD_INTERVAL === 0 && idx !== lostPetList.length - 1;
            if (!shouldInjectAd) return [node];
            return [
              node,
              <AdSlot
                key={`ad-${idx}`}
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED ?? ""}
                format="fluid"
                minHeight={240}
              />,
            ];
          })
        )}
      </div>
      <LostPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
    </div>
  );
}
