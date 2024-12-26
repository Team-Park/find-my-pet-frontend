import { create } from 'zustand'

interface IUserInfo {
    email: string;
    role: 'ROLE_USER' | 'ROLE_ADMIN';
    name: string
 }

 interface IUser {
    user: IUserInfo | null
    setInit: () =>  void;
    setUserInfo: (userInfo:IUserInfo) => void;
 }

const useUserState = create<IUser>((set) => ({
    user: null,
    setInit: () => set(() => ({user : null})),
    setUserInfo: (userInfo:IUserInfo) => set(() => ({user: userInfo}))
 }))

export default useUserState