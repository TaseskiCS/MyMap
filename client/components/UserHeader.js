import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserContext from '../context/userContext';
const UserHeader = () => {
    const router = useRouter();
    const handleLogOut = () => {
        localStorage.removeItem("MyMapToken");
        router.push('/login');
    }

    const {userData, setUserData} = useContext(UserContext);
    const {userPhoto, username} = userData;
    useEffect(()=> {
        if (!localStorage.getItem("MyMapToken")) return window.location.href = "/login";
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/data/dashboard`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("MyMapToken")
            })
        }).then((res)=> res.json())
        .then((data)=> {
            if (data.status==="error"){
                return toast.error("An error has occured")
            }
            setUserData(data.userData);
            localStorage.setItem('Handle', data.userData.username)
        }).catch((err)=> {
            console.log(err);
        })
    }, [])
  return (
    <>
        <header className="flex flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row p-5">
                <Link href='/edit/links' >
                    <button className="bg-gray-200 inline-flex w-full md:w-auto px-5 py-3 text-purple-400 font-bold hover:text-purple-700 hover:bg-gray-300 rounded-md mb-3 border-2 border-purple-400"> 
                        <img src="/svg/link.svg" className='w-6 mr-3'></img>
                        <span className="hidden md:inline">Edit links</span>
                    </button>
                </Link>
                <Link href='/edit/profile'>
                    <button className="bg-gray-200 inline-flex w-full md:w-auto px-5 py-3 text-red-400 font-bold hover:text-red-700 hover:bg-gray-300 rounded-md mb-3 border-2 border-red-400  md:ml-4"> 
                        <img src="/svg/user.svg" className='w-6 mr-3'></img>
                        <span className="hidden md:inline">Edit Profile</span>
                    </button>
                </Link>
            </div>
            <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${username}`}>
                <div className="flex flex-row">
                    <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg">
                        <div className="text-center text-xs md:text-md flex flex-col flex-wrap">
                            <span className="font-bold ">{username}</span>
                            <h1>See Preview</h1>
                        </div>
                        <div className="user-img">
                            <img className = 'w-10 ml-5 rounded-full shadow-md border-white border-2'src = {userPhoto}></img>
                        </div>    
                    </div>
                    <img className="w-6 mr-5 cursor-pointer" src="/svg/notification.svg"></img>
                    <img className="w-6 mr-5 cursor-pointer" src="/svg/logout.svg" onClick={handleLogOut}></img>
                </div>
            </Link>
        </header>
    </>
  )
}

export default UserHeader;