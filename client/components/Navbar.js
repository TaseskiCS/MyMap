import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

const NavBar = () => {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    useEffect(()=>{
        setMobileMenuOpen(false);

        const token = localStorage.getItem('MyMapToken');
        if (token) {
        setIsLoggedIn(true); // User is logged in
        } else {
        setIsLoggedIn(false); // User is not logged in
        }
    }, [router.asPath])

    const logout = () => {
        localStorage.removeItem('MyMapToken'); 
        setIsLoggedIn(false); 
        router.push('/');
      };

    return (
    <>    
        <nav className="bg-transparent border-b-2 border-indigo-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center">
                <img src="/png/mymap-Logo.png" className="w-12 mr-3" alt="Company Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-black">MyMap</span>
            </Link>
            <button onClick={toggleMobileMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            <div className={`${mobileMenuOpen ? "" : "hidden"} z-50 w-full md:block md:w-auto focus:outline-none`} id="navbar-default">                                  {/* bg of mobile bar */}  {/* bg of nornal size bar */}
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-600 md:bg-transparent  dark:border-gray-700">
                <li>
                <Link href="/" className="text-lg block py-2 pl-3 pr-4 active:bg-blue-700 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
                </li>
                {!isLoggedIn && (
                <li>
                <Link href="/register" className="text-lg block py-2 pl-3 pr-4 active:bg-blue-700 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                </li>
              )}
                {isLoggedIn && (
                <>
                  <li>
                    <Link href="/dashboard" className="text-lg block py-2 pl-3 pr-4 active:bg-blue-700 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-lg text-red-500 hover:text-red-700">
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </ul>
            </div>
        </div>
        </nav>
    </>
    )
}

export default NavBar