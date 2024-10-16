import KakaoLogo from "@/static/image/kakao.png"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import PostList from "@/app/_components/profile/PostList";

export default function Profile(){
    
    return (
        <div className="w-full flex sm:flex-row flex-col gap-10">
            <div>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 py-3">
                        <div className="font-bold text-lg">프로필</div>
                        <div className="flex justify-center items-center rounded-sm w-[30px] h-[30px] bg-[#FEE500]"><Image src={KakaoLogo} width="15" height="15" alt="카카오 로고"/></div>
                    </CardHeader>
                    <CardContent className="flex items-center h-full gap-4 py-3">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>-</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col h-full ">
                                <span className="text-sm">정도</span>
                                <span className="text-sm">jeongdo.indiv@gmail.com</span>
                            </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-screen h-full flex flex-col sm:gap-4 overflow-hidden">
                <span className="font-bold text-lg">작성 목록</span>
                <div className="flex gap-6 w-full flex-wrap justify-start">
                    <span className="font-bold text-lg w-full text-center">💡 작성한 글이 없습니다.</span>
                    <PostList/>
                </div>
            </div>
        </div>
    )
}