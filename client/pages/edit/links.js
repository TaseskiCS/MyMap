import UserHeader from '@/components/UserHeader'
import React, {useState, useEffect, useContext}from 'react'
import { toast } from 'react-toastify';

const links = () => {
    const [links, setLinks] = useState([{url: '', title: ''}]);
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');

    const handleLink = (index, field, val)=> {
        const updatedLinks = [...links];
        const linkToUpdate = { ...updatedLinks[index], [field]: val};
        updatedLinks[index] = linkToUpdate;
        setLinks(updatedLinks);

    }

    const handleNewLink = () => {
        setLinks([...links, {url: '', title: '', icon: ''}]);
    }

    const handleRemoveLink = (index) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    }

    const saveLinks = e => {
        e.preventDefault();
        const linksArray = Object.values(links);
        const titlesArray = Object.values(title);
        const iconsArray = Object.values(icon);
        const linksData = linksArray.map((link, index)=> ({
            link,
            title: titlesArray[index],
            icon: iconsArray[index]
        }))

        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/save/links`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem('MyMapToken'),
                    links: linksData
                })
            }).then((res)=> res.json())
            .then((data)=> {
                if (data.status ==='error'){
                    return toast.error(data.error);
                }
                toast.success('Links saved!')
            
        })
            
        
    }
    useEffect(()=> {
        if (!localStorage.getItem('MyMapToken')){
            return router.push('/login');
        }
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/load/links`, {
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
            setLinks(data.links);
        })
    }, [])
    
  return (
    <>
        <div>
            <UserHeader/>
            <main>
                <section>
                    <h1 className='font-bold text-center text-xl text-gray-600'>Customize your links</h1>
                    <div>
                        <form onSubmit={saveLinks}>
                            {links.map((link, index)=> (
                                <div className='flex flex-col md:flex-row items-center justify-evenly my-2' key={index}>
                                    <label>
                                        URL:
                                        <input required={true} className='outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-4' type="text" value={link.url} onChange={e=> handleLink(index, 'url', e.target.value)}></input>
                                    </label>
                                    <label>
                                        TITLE:
                                        <input required={true} className='outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-2' type="text" value={link.title} onChange={e=> handleLink(index, 'title', e.target.value)}></input>
                                    </label>
                                    <label>
                                        ICON:
                                        <input className='outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-2' type="text" value={link.icon} onChange={e=> handleLink(index, 'icon', e.target.value)}></input>
                                    </label>
                                    <button className='bg-red-500 text-white px-4 py-2 rounded-md shadow-sm ml-10' type="button" title='Remove this link'onClick={()=>handleRemoveLink(index)}>
                                        [X]
                                    </button>
                                </div>
                            ))}
                            <div className='buttons flex flex-row gap-5 my-1'>
                                <button className='bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm w-full' type="button" title='Add new link' onClick={handleNewLink}>
                                    [+] Add New Link
                                </button>
                                <button className='bg-green-500 text-white px-4 py-2 rounded-md shadow-sm w-full' type="submit" title='Save changes'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    </>
  )
}

export default links