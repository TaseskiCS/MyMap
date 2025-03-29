import React, {useContext, useEffect, useState}from 'react';
import UserContext from '../../context/userContext';
import UserHeader from '../../components/UserHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const profile = () => {
    const router = useRouter();
    const {userData, setUserData} = useContext(UserContext);
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
            
                
            </section>
        </main>
        </div>
    </>
  )
}

export default profile