"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import image from '@/static/image/banner.jpg'
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import LocalStorage from "@/lib/localStorage";
import useIsLoginStore from "@/store/loginStore";

export default function KakaoAuth({ searchParams }: { searchParams: { code: string } }) {
  const router = useRouter()
  const AUTH_CODE = searchParams.code;
  const setLogin = useIsLoginStore((state) => state.setLogin)
  const requestBody = {
    code: AUTH_CODE,
    redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/auth/kakao`,
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://find-my-pet.duckdns.org/api/v1/auth/sign-in/kakao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((res) => {
          LocalStorage.setItem('userName' ,JSON.stringify(res.data.name))
          LocalStorage.setItem('at', JSON.stringify(res.data.accessToken))
          setLogin()
          router.push('/')
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

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
    <div className="w-full h-[500px] text-center font-bold">
      Loading ...
    </div>
  </div>
  )
}
