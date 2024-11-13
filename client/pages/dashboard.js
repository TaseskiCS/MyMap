import React, { useContext, useEffect, useState } from "react";
import LinkBox from '../components/LinkBox'
import UserHeader from "/components/UserHeader";
import {toast} from 'react-toastify'
import UserContext from "../context/userContext";

const dashboard = () => {
    const [data, setData] = useState({});
    const {setUserData} = useContext(UserContext);
    const [viewsCount, setViewCount] = useState(0);
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
            setData(data.userData);
            setUserData(data.userData);
            localStorage.setItem('Handle', data.userData.username)
        }).catch((err)=> {
            console.log(err);
        })
    }, [])
    

    useEffect(()=> {
        if (!localStorage.getItem("MyMapToken")) return window.location.href = "/login";
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/data/views`, {
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
            setViewCount(data.views);
        }).catch((err)=> {
            console.log(err);
        })
    }, [])
    return (
        <>
            <div className="">
                <UserHeader/>
                <main>
                    <section className ="mt-20 grid-row md:grid-cols-2 xl:grid-cols-4 gap-5">
                        <LinkBox title="Links" stat={data.links} svg="link" colour="indigo"/>
                        <LinkBox title="Profile views" stat={viewsCount} svg="growth" colour="red"/>

                    </section>
                    <section>
                        
                    </section>
                </main>
            </div>
        </>
    )
}

export default dashboard;