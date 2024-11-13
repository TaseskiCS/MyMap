import React from 'react'
import SocialCard from './SocialCard';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const SocialMap = ({data}) => {
    const {name, userPhoto, bio, links} = data;

    const router = useRouter();
    const shareLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${router.query.username}`)
        toast.success("Copied page link!")
    } 
  return (
    <>
        <section className="">
            <div className='flex justify-center items-center gap-20'>
                <Link href='/'>
                    <div>
                        <img className='flex justify-center w-20 cursor-pointer'src="/png/Mymap-logo.png"></img>
                    </div>
                </Link>
                <div 
                    onClick={shareLink}
                    className="flex items-center cursor-pointer p-3 bg-gray-200  hover:bg-gray-400 rounded-md shadow-md border-2 border-gray-400">
                    <img className="flex items-center w-4" src="/svg/sharelink.svg" alt="share"></img>
                </div>
            </div>
            <div className='flex mt-10 justify-center'>
                <div className='w-40 rounded-full flex justify-center mt-2'>
                    <img className="rounded-full flex items-centerjustify-center"src={userPhoto}></img>
                </div>
            </div>
            <h2 className="text-center text-xl font-bold mt-10">{name ? name: 'No Name'} </h2>
            <div className="text-center md:w-2/3 mx-auto pb-5">
                <p>{bio}</p>
            </div>
            <div className='flex flex-col justify-center max-w-7x1 m-auto md:my-5 w-full md:w-2/5'>
                <AnimatePresence>
                    {links.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y:40 }}
                            animate={{ opacity: 1, y: 0, transition: {delay: index * 0.1 + 0.5} }}
                        >
                            <SocialCard title={link.title} url={link.url} image={link.icon}/>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    </>
  )
}

export default SocialMap;