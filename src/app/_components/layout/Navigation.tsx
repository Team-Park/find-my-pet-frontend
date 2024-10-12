"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KakaoLoginDialog } from "../KakaoLoginDialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import LocalStorage from "@/lib/localStorage";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import useIsLoginStore from "@/store/loginStore";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();
  const isLogin = useIsLoginStore((state) => state.isLogin)
  const setLogin = useIsLoginStore((state) => state.setLogin)
  const setLogout = useIsLoginStore((state) => state.setLogout)

  const [userName, setUserName] = useState<string | null>('')
 useEffect(() => {
  if(LocalStorage.getItem('at')) {setLogin(); setUserName(LocalStorage.getItem('userName'))}
  else setLogout()
 }, [])
  return (
    <div className="w-full flex justify-center border-b px-6">
      <nav className="flex items-center h-16 max-w-[1280px] w-full justify-between">
        <div className="font-bold hover:cursor-pointer" onClick={() => router.push("/")}>
          Find My Pet
        </div>
        <div className="flex gap-6">
          {
              isLogin ? 
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>-</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="border-1 z-50">
                  <div className="w-[120px] p-3 shadow-lg z-50 rounded-md bg-gray-50 flex flex-col gap-3">
                    <Badge>{userName}</Badge>
                    <Button variant="outline" className="font-bold"><Link href="/profile">마이페이지</Link></Button>
                    <Button variant="outline" className="font-bold" onClick={() => {
                      LocalStorage.removeItem('userName')
                      LocalStorage.removeItem('at')
                      setLogout()
                      setUserName('')
                      router.push('/')
                    }}>로그아웃</Button>
                  </div>
                </PopoverContent>
              </Popover>
                :
              <KakaoLoginDialog>
                <Button variant="outline">로그인</Button>
              </KakaoLoginDialog>
          }
        </div>
      </nav>
    </div>
  );
}
