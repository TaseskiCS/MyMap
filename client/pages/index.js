import Link from 'next/link'
import MyHead from '../components/MyHead';
import MyTabs from '@/components/MyTabs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center">
      <div className='flex flex-col sm:flex-row  justify-center items-center'>
        <div>
            <img className="w-80"src='/png/mymap-logo.png'></img>
        </div>
        <div className='flex justify-center items-center flex-col'>
            <h1 className='text-center font-bold text-6xl'>CREATE YOUR SOCIAL MAP</h1>
            <h3 className='flex justify-center text-sm lg:mb-0 md:mb-0 mb-10'>100% Free</h3>
        </div>

      </div>
    </div>
    <div className='flex justify-center items-center'>
      <Link className='max-w-2xl shadow-2xl w-full flex justify-center mx-10 p-5 bg-indigo-500 rounded-lg text-white text-xl' href="/register">Get Started</Link>
    </div>

    <div className='mt-20 mb-10'>
          <h1 className='text-center font-bold text-6xl'>EASY TO USE</h1>
    </div>
    <MyTabs/>
    <Footer/>
  
      {/* <main className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className='text-center'> Welcome to <br/><span className='text-indigo-600 font-semibold'>MyMap</span></h1>
        <Link className='bg-indigo-600 rounded-sm inline-block my-2 p-1 px-2 text-white' href="/register">Register</Link>
      </main> */}
    </>
  )
}
