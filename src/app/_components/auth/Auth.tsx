"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import image from '@/static/image/banner.jpg'
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import LocalStorage from "@/lib/localStorage";
import useIsLoginStore from "@/store/loginStore";
import { Spinner } from "@/components/ui/spinner";
import apiClient from "@/lib/api";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  setCookie,
} from "@/lib/cookieUtils";


const Auth = ({accessToken, refreshToken}: {accessToken: string; refreshToken: string;}) => {
  const router = useRouter()
  const setLogin = useIsLoginStore((state) => state.setLogin)

  useEffect(() => {
          // 토큰은 쿠키로 저장 (withCredentials + Authorization 양쪽 전송)
          setCookie(COOKIE_ACCESS_TOKEN, accessToken)
          setCookie(COOKIE_REFRESH_TOKEN, refreshToken)
          const getUserInfo = async () => {
             await apiClient.get('/user/me').then((res) => {
              // 사용자 프로필은 민감정보 아니므로 LocalStorage 유지
              LocalStorage.setItem('email', JSON.stringify(res.data.data.email))
              LocalStorage.setItem('name', JSON.stringify(res.data.data.name))
              LocalStorage.setItem('role', JSON.stringify(res.data.data.role))
             })
          }

          getUserInfo()
          setLogin()
          router.push('/')
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
            반려견 실종 시
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
    <div className="w-full h-[500px] flex justify-center items-center font-bold">
      <Spinner/>
    </div>
  </div>
  )
}

export default Auth