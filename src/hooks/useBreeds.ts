"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import type { AnimalType, Breed } from "@/types/breed";

// 모듈 스코프 캐시 — 페이지 이동해도 브라우저 세션 내 재사용.
const cache = new Map<AnimalType | "ALL", Breed[]>();
const pending = new Map<AnimalType | "ALL", Promise<Breed[]>>();

async function fetchBreeds(animalType?: AnimalType): Promise<Breed[]> {
  const key = animalType ?? "ALL";
  const cached = cache.get(key);
  if (cached) return cached;
  const inFlight = pending.get(key);
  if (inFlight) return inFlight;

  const p = apiClient
    .get("/breeds", { params: animalType ? { animalType } : {} })
    .then((res) => {
      const list: Breed[] = res?.data?.data ?? [];
      cache.set(key, list);
      pending.delete(key);
      return list;
    })
    .catch((e) => {
      pending.delete(key);
      throw e;
    });
  pending.set(key, p);
  return p;
}

export function useBreeds(animalType?: AnimalType): {
  breeds: Breed[];
  isLoading: boolean;
  byId: (id?: string | null) => Breed | undefined;
} {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    fetchBreeds(animalType)
      .then((list) => {
        if (mounted) setBreeds(list);
      })
      .catch(() => {
        if (mounted) setBreeds([]);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [animalType]);

  return {
    breeds,
    isLoading,
    byId: (id) => (id ? breeds.find((b) => b.id === id) : undefined),
  };
}
