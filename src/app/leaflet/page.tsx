'use client'
import Image from "next/image";
import img from '../../static/image/guide.jpg'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Leaflet(){
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <div className="w-full h-full flex flex-col gap-10 items-center">
            <div className="w-[600px] h-[100px] rounded-md bg-gray-100 flex items-center justify-center font-bold text-xl">💡 각 필드를 채워주세요. <br/> 하단에 프린트 버튼이 있습니다.</div>
            <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center" ref={contentRef}>
                <div className="w-full h-[30%] bg-red-600 flex justify-center items-center text-8xl font-bold text-white flex-col gap-6">
                    강아지를 찾습니다!
                    <span className="text-xl">잃어버린 강아지를 찾는 즉시 수거하겠습니다. 떼지 말아주세요. 부탁드립니다.</span>
                </div>
                <div className="w-full h-full flex flex-col">
                    <div className="w-full flex justify-center">
                        <div className="flex gap-5">
                            <div className="flex justify-center items-center relative w-[600px] h-[500px] ">
                                <Image src={img} layout="fill" objectFit="contain" alt="banner image" placeholder="blur" />
                            </div>
                            <div className="flex justify-center items-center relative w-[600px] h-[500px] ">
                                <Image src={img} layout="fill" objectFit="contain" alt="banner image" placeholder="blur" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-10 bg-yellow-200 flex flex-col gap-6 py-10">
                        <div className="w-full flex flex-col gap-2 text-5xl font-bold">
                            <div>⚫️ 실종견 : <span className="text-red-600">시츄 / 수컷 / 7살</span></div>
                            <div>⚫️ 실종날짜 : <span className="text-red-600">2024년 11월 9일 (토) 오후 12:00</span></div>
                            <div>⚫️ 실종장소 : <span className="text-red-600">간석역 부근</span></div>
                            <div>⚫️ 특징 : <span className="text-red-600">5KG, 갈색/흰색털 섞임, 꼬리가 긴편, 겁이 많음</span></div>
                        </div>
                        <div className="w-full flex flex-col gap-2 text-4xl font-bold">
                            <div>천둥번개 치는 어두운 날이었고, 겁을 먹고 집 방충망을 뚫고 나갔습니다.</div>
                            <div>가족들이 애타게 찾고 있어요. 보호/목격하시면 꼭 연락부탁드려요.</div>
                            <div>보호중이신 분, 찾는데 결정적 제보 주신 분께 사례하겠습니다.</div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-2 text-8xl font-bold">
                            010-2225-3988
                        </div>
                    </div>
                </div>
            </div>
            <Button size="lg" onClick={() => reactToPrintFn()} className="text-xl">🖨️ 프린트</Button>
        </div>
    )
}