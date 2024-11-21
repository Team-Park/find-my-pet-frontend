import Image from "next/image";
import { Card } from "./ui/card";
import { formatDateToKorean, truncateText} from "@/lib/utils";
import { Badge } from "./ui/badge";

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

export default function LostCard({ ...pet }: ILostPet) {
  return (
    <Card className="h-[450px] sm:w-[400px] w-full hover:cursor-pointer flex flex-col gap-4">
      <div className="h-[200px] rounded-md flex justify-center relative">
        {
            pet.thumbnail ? 
            <Image src={pet.thumbnail} layout="fill" alt="abandonment pet image" className="rounded-t-lg object-cover" />
            :
            <div className="flex justify-center items-center font-bold">NO IMAGE</div>
        }
      </div>
      <div className="font-bold items-center text-center w-full h-12 px-4">{pet.title}</div>
      <div className="px-2">
        <div className="flex gap-1 flex-col text-sm">
            <div className="bg-gray-100 p-2 rounded-md">📍 {pet.place}</div>
            <div className="p-2 rounded-md flex gap-2">
              <div className=" text-white bg-emerald-500 rounded-md p-2 text-xs font-bold">📅 {formatDateToKorean(pet.time)}</div>
              <div className=" text-white bg-amber-500 rounded-md p-2 text-xs font-bold">사례금 {pet.gratuity}만원</div>
            </div>
        </div>
        <span className="text-sm">{truncateText(pet.description)}</span>
      </div>
    </Card>
  );
}
