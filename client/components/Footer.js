import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer aria-label="Footer" className="flex justify-around bg-gray-300 border-indigo-300 border-t-2 w-full bottom-5 p-5">
      <div className='flex sm:gap-20 sm:flex-row flex-col gap-5'>
        <div className="flex flex-row items-center">
          <h5 className="text-black text-center pl-3 font-bold transition-all duration-400 flex gap-3" >Built by<Link target="_blank"href="https://antoniotaseski.com"><h3 className='hover:text-indigo-300 underline'>Antonio Taseski</h3></Link></h5>
        </div>
        <div className="flex flex-row justify-center">
              <Link className=" rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-indigo-300 mx-1 select-none"target='_blank' href={`https://www.linkedin.com/in/antonio-taseski-8ba015290/`}>
                  <img className="w-6" src = "/svg/linkedin.svg"></img>
              </Link>
              <Link className="rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-indigo-300 mx-1 select-none"target='_blank' href={`https://github.com/TaseskiCS`}>
                  <img className="w-6" src = "/svg/github.svg"></img>
              </Link>
              <Link className="rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-indigo-300 mx-1 select-none"target='_blank' href={`https://discord.com/users/TaseskiCS`}>
                  <img className="w-6" src = "/svg/discord.svg"></img>
              </Link>
          </div>
      </div>

    </footer>
  )
}

export default Footer