import React from 'react'

const LinkBox = ({title, stat, svg, colour}) => {
  return (
    <div className="flex items-center p-8 bg-white shadow border rounded-lg">
        <div className={`bg-${colour}-500 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full mr-6`}>
            <img src={`/svg/${svg}.svg`} className='w-6'></img>
        </div>
        <div className="">
            <span className="inline-block text-2xl font-bold">{stat}</span>
            <span className="block text-gray-500">{title}</span>
        </div>
    </div>
  )
}

export default LinkBox;