import React, {useContext, useEffect, useState}from 'react';
import UserContext from '../../context/userContext';
import UserHeader from '../../components/UserHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const profile = () => {
    const router = useRouter();
    const {userData, setUserData} = useContext(UserContext);
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
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userPhoto, setUserPhoto] = useState('https://cdn-icons-png.flaticon.com/512/848/848006.png');
  
    const handleSocials = e => {
        setSocial({
            ...social,
            [e.target.id]: e.target.value
        })
    }
    useEffect(()=> {
        if (userData) {
            setName(userData.name);
            setUserPhoto(userData.userPhoto);
            setBio(userData.bio);
        }
    }, [userData]);

    const saveProfile = e => {
        e.preventDefault();
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/save/profile`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('MyMapToken'),
                name: name,
                bio: bio,
                userPhoto: userPhoto
            })
        }).then((res)=> res.json())
        .then((data)=> {
            if (data.status==='error') return toast.error(data.error);
            toast.success('Profile saved!');
        })
    }

    const saveSocials = e => {
        e.preventDefault();
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/save/socials`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('MyMapToken'),
                socials: social
            })
        }).then((res)=> res.json())
        .then((data)=> {
            if (data.status==='error') return toast.error(data.error);
            toast.success('Links saved!');
        })
    }

    useEffect(()=> {
        if (!localStorage.getItem('MyMapToken')){
            return router.push('/login');
        }
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/load/socials`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('MyMapToken'),
            })
        }).then((res)=> res.json())
        .then((data)=> {
            if (data.status ==='error'){
                return toast.error(data.error);
            }
            setSocial(data.socials);
        })
    }, [])
    return (
    <>
        <div>
        <UserHeader/>
        <main>
            <section>
            <div>
                <h4 className="font-bold text-center mb-5">Edit Profile</h4>
                <div>
                <form onSubmit={saveProfile} className="flex flex-col justify-center items-center">
                    <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/user.svg"></img>
                        <input value={name} onChange={e=>(setName(e.target.value))} className="focus:outline-none w-full" required type="text" placeholder="name:"></input>
                    </span>
                    <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/bio.svg"></img>
                        <input value={bio} onChange={e=>(setBio(e.target.value))} className="focus:outline-none w-full" required type="text" placeholder="bio:"></input>
                    </span>
                    <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/profilepic.svg"></img>
                        <input value={userPhoto} onChange={e=>(setUserPhoto(e.target.value))}className="focus:outline-none w-full" required type="text" placeholder="profile picture:"></input>
                        <img className="w-20 rounded-full border-2 border-white shadow-md"src={userPhoto}></img>                    
                    </span>
                    <input className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white" type="submit" value="Save profile"></input>
                </form>
                </div>
            </div>
            <div className="mt-14">
                <h4 className="font-bold text-center mb-5">Edit Social ID's</h4>
                <div>
                <form onSubmit={saveSocials}className="flex flex-col justify-center items-center">
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/instagram.svg"></img>
                        <input id='instagram' value={social.instagram} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="instagram:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/tiktok.svg"></img>
                        <input id='tiktok' value={social.tiktok} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="tiktok:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/facebook.svg"></img>
                        <input id='facebook' value={social.facebook} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="facebook:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/youtube.svg"></img>
                        <input id='youtube' value={social.youtube} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="youtube:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/twitter.svg"></img>
                        <input id='twitter' value={social.twitter} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="X:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/linkedin.svg"></img>
                        <input id='linkedin' value={social.linkedin} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="linkedin:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/github.svg"></img>
                        <input id='github' value={social.github} onChange={handleSocials}className="focus:outline-none w-full" required type="text" placeholder="github:"></input>
                    </span>
                    <span className="bg-white gap-3 mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
                        <img className="w-6"src="/svg/discord.svg"></img>
                        <input id='discord' value={social.discord} onChange={handleSocials} className="focus:outline-none w-full" required type="text" placeholder="discord:"></input>
                    </span>
                    
                    <input className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white" type="submit" value="Save socials"></input>
                </form>
                </div>
            </div>
                
            </section>
        </main>
        </div>
    </>
  )
}

export default profile