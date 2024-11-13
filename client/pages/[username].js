import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SocialMap from '../components/SocialMap';
import SocialSet from '../components/SocialSet';
import ShareButton from '../components/ShareButton';
import Link from 'next/link';
const Handle = () => {
    const router = useRouter();
    const [data, setData] = useState({});
    const [userFound, setUserFound] = useState(false);
    const [social, setSocial] = useState({
        instagram: '',
        tiktok: '',
        facebook: '',
        youtube: '',
        twitter: '',
        linkedin: '',
        github: '',
        discord: '',
    });
    useEffect(()=> {
        console.log("router.isReady:", router.isReady);
        console.log("router.query.username:", router.query.username);
        if (router.isReady && router.query?.username) {
            const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
            fetch(`${backend}/get/${router.query.username}`)
                .then((res)=> res.json())
                .then((data)=> {
                    console.log(data.status);
                    if (data.status === 'error'){
                        return toast.error(data.message);
                    }
                    if (data.status === 'success'){
                        setData(data.userData);
                        setUserFound(true);
                        setSocial(data.socials);
                    }
                }).catch((err)=> console.log(err));
        } else {
            console.log("something wrong")
        }
    }, [router.query])

    useEffect(()=> {
        if (router.isReady && router.query?.username) {
            const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
            fetch(`${backend}/get/socials/${router.query.username}`)
                .then((res)=> res.json())
                .then((data)=> {
                    console.log(data.status);
                    if (data.status === 'error'){
                        return toast.error(data.message);
                    }
                    if (data.status === 'success'){
                        setSocial(data.socials);
                        console.log("yeas")
                        console.log(data.socials);
                    }
                }).catch((err)=> console.log(err));
        } else {
            console.log("something wrong")
        }
    }, [router.query])


    if (!userFound) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='not-found px-3'>
                    <h1 className='font-bold text-lg'>User not found</h1>
                    <br/>
                    <p className="mb-5">The page you entered does not exist!</p>
                    <Link href="/register" className='mt-20 rounded-xl bg-indigo-600 px-2 ml-2 hover:bg-indigo-300 transition-all duration-500'>
                        Create your own Social Map here!
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <SocialMap data={data}/>
            <SocialSet social={social}/>
        </div>
    )
}

export default Handle

