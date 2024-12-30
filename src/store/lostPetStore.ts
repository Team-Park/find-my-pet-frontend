import { create } from 'zustand'

interface ILostPetInfo {
    postId: string,
    title: string,
    phoneNum: string,
    time: Date,
    place: string,
    gender: string,
    gratuity: number,
    description: string,
    lat: number,
    lng: number,
    chatURL: string,
    customNickname: string,
}

interface ILostPet{
        lostPet: ILostPetInfo | null,
        setLostPetInfo: (obj:ILostPetInfo) => void
}

const useLostPet = create<ILostPet>((set) => ({
    lostPet: null,
    setLostPetInfo: (obj: ILostPetInfo) => set(() => ({ lostPet: obj })),
 }))

export default useLostPet