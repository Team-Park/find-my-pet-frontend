'use client' // Error components must be Client Components
 
import { BASE_URL } from '@/app/constant/api'
import { useToast } from '@/hooks/use-toast'
import LocalStorage from '@/lib/localStorage'
import useIsLoginStore from '@/store/loginStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    const {toast} = useToast()
    const router = useRouter()
    const setLogout = useIsLoginStore((state) => state.setLogout)
    const reissue = async () => {
        await fetch(`${BASE_URL}/auth/reissue}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${LocalStorage.getItem('rt')?.replace(/"/g, '')}`
            },
            body: JSON.stringify({refreshToken: LocalStorage.getItem('rt')?.replace(/"/g, '')})
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === "EXPIRED_JWT"){
                toast({
                    title: "세션 만료",
                    description: "세션이 만료되었습니다. 다시 로그인해주세요."
                })
                setLogout()
                router.push('/')
            }
            reset()
        });
    }

  useEffect(() => {
    // Log the error to an error reporting service
    reissue()
    console.log(error)
  }, [error])
 
  return (
    <div>
      <h2>Profile</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Profile Try again
      </button>
    </div>
  )
}