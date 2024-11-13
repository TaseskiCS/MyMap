import React, { useState } from 'react'
import styles from '../styles/apply.module.css'
import Footer from '@/components/Footer'
import {toast} from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Register = () => {

  const router = useRouter();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const handleRegistry = (e) => {
    e.preventDefault()
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
    fetch(`${backend}/api/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'success') {
        toast("You are now registered!");
        localStorage.setItem('MyMapToken', data.token);
        setSubmitted(true);
        router.push('/login');
      }else {
        toast.error(data.message);
      }} 
    ).catch(err => {
      toast.error(data.message);

    });
    
  }
  return (
   <>
    <section className={"w-full min-h-screen flex justify-center items-center"}>
      <div className="main w-full mx-10 md:mx-40 lg:mx-40 lg:max-w-4xl">
        <div className="content border-2 border-black px-4 py-20 rounded-2xl shadow-lg">
          <h1 className="text-black text-3xl font-bold text-center">Join Now!</h1>
          <p  className="text-black text-center">Create your own <b><i>Map</i></b> !</p>
          <form className="flex flex-col gap-5 mt-10" onSubmit={handleRegistry}>
            <span className="bg-white gap-3 flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
              <img className="w-6"src="/svg/user.svg"></img>
              <input value ={username} onChange={e=>setUsername(e.target.value)} className="focus:outline-none" required type="text" placeholder="Username"></input>
            </span>
            <span className="bg-white gap-3 flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
              <img className="w-6"src="/svg/email.svg"></img>
              <input value ={email} onChange={e=>setEmail(e.target.value)} className="focus:outline-none" required type="email"placeholder="Email"></input>
            </span>
            <span className="bg-white gap-3 flex flex-row shadow-md border-2 px-3 py-2  rounded-md">
              <img className="w-6"src="/svg/password.svg"></img>
              <input value ={password} onChange={e=>setPassword(e.target.value)} className="focus:outline-none" required type="password" placeholder="Password"></input>
            </span>
          <input className="bg-indigo-500 text-white py-2 rounded-lg cursor-pointer"  required type="submit"  value="Register"></input>
          </form>
        </div>
        <Link className="cursor-pointer hover:text-violet-500 text-violet-300 flex justify-center mt-2"href="/login">
            <h4>Have An Account?</h4>
        </Link>
      </div>
    </section>
    <Footer/>
   </>
  )
}

export default Register