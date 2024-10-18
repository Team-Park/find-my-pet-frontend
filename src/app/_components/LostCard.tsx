import Image from "next/image";
import { Card } from "./ui/card";
import { formatDateToKorean} from "@/lib/utils";

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
    <Card className="h-[350px] sm:w-[250px] w-full hover:cursor-pointer flex flex-col gap-2">
      <div className="h-[200px] rounded-md flex justify-center relative">
        {
            pet.thumbnail ? 
            <Image src={pet.thumbnail} layout="fill" alt="abandonment pet image" className="rounded-t-lg object-cover" />
            :
            <div className="flex justify-center items-center font-bold">NO IMAGE</div>
        }
      </div>
      <div className="font-bold items-center text-center w-full">{pet.title}</div>
      <div className="px-2">
        <div className="flex gap-1 flex-col text-sm">
            <div>장소 : {pet.place}</div>
            <div>날짜 : {formatDateToKorean(pet.time)}</div>
            <div>description</div>
        </div>
        <span className="text-sm">{pet.description}</span>
      </div>
    </Card>
  );
}
