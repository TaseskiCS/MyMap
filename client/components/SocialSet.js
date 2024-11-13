import React from 'react';
import Link from 'next/link';

const SocialSet = ({social}) => {
    const {
        instagram,
        tiktok,
        facebook,
        youtube,
        twitter,
        linkedin,
        github,
        discord
    } = social; 
  return (
    <>
        <div className="social flex flex-row justify-center my-4">
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://instagram.com/${instagram}`}>
                <img className="w-6" src = "/svg/instagram.svg"></img>
            </Link>
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://tiktok.com/${tiktok}`}>
                <img className="w-6" src = "/svg/tiktok.svg"></img>
            </Link>
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://facebook.com/${facebook}`}>
                <img className="w-6" src = "/svg/facebook.svg"></img>
            </Link>
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://youtube.com/@${youtube}`}>
                <img className="w-6" src = "/svg/youtube.svg"></img>
            </Link>
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://linkedin.com/${linkedin}`}>
                <img className="w-6" src = "/svg/linkedin.svg"></img>
            </Link>
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://github.com/${github}`}>
                <img className="w-6" src = "/svg/github.svg"></img>
            </Link>
            <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none"target='_blank' href={`https://discord.com/${discord}`}>
                <img className="w-6" src = "/svg/discord.svg"></img>
            </Link>
        </div>
    </>
  )
}

export default SocialSet;