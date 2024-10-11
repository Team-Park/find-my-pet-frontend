import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import Image from "next/image";
import KakaoLogo from "@/static/image/kakao.png"

export function KakaoLoginDialog({ children }: { children: React.ReactElement }) {
  
  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}/auth/kakao`;
    window.location.href = kakaoAuthURL;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md h-[250px]">
        <DialogHeader>
          <DialogTitle>Find My Pet</DialogTitle>
          <DialogDescription>Find My Pet에 오신 것을 환영합니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex justify-center text-center">
          <Button type="button" onClick={handleKakaoLogin} className="bg-[#FEE500] w-[160px] h-[40px] flex gap-5 hover:bg-[#FEE500]">
            <Image src={KakaoLogo} width="15" height="15" alt="카카오 로그인 로고"/>
            <div className="text-black">카카오 로그인</div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
