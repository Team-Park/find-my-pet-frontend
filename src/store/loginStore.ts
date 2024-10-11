import { create } from 'zustand'

interface ILogin {
    isLogin: boolean;
    setLogin: () => void;
    setLogout: () => void;
 }

const useIsLoginStore = create<ILogin>((set) => ({
  isLogin: false,
  setLogin: () => set(() => ({ isLogin: true })),
  setLogout: () => set(() => ({ isLogin: false})),
 }))

export default useIsLoginStore