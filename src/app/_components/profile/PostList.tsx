'use client'
import LocalStorage from "@/lib/localStorage"
import { useEffect } from "react"

export default function PostList(){
    const AT = LocalStorage.getItem('at')?.replace(/"/g, '');
    useEffect(() => {
        const getPosts = async() => await fetch('https://find-my-pet.duckdns.org/api/v1/user/my-page',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${AT}`
    
            }
        })
        .then((res) => res.json())
        .then((res) => console.log(res))

        getPosts()
    })
    // const AT = LocalStorage.getItem('at')

    return (
        <div>
            
        </div>
    )
}