import React from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const ShareButton = () => {
    const router = useRouter();
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const shareLink = () => {
        navigator.clipboard.writeText(`${baseURL}/${router.query.username}`)
        toast.success("Copied page link!")
    } 
  return (
    <>
        <div 
        onClick={shareLink}
        class="absolute cursor-pointer top-28 left-20 bg-indigo-200 p-2 rounded-md z-10 shadow-md border-2 border-indigo-400">
            <img className="w-4" src="/svg/sharelink.svg" alt="share"></img>
        </div>
    </>
  )
}

export default ShareButton