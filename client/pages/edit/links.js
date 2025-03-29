import UserHeader from '@/components/UserHeader'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLink, FiPlus, FiSave, FiTrash2, FiType, FiImage } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Links = () => {
    const router = useRouter();
    const [links, setLinks] = useState([{url: '', title: '', icon: ''}]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLink = (index, field, val) => {
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
        setIsLoading(true);
        
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/save/links`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('MyMapToken'),
                links: links
            })
        }).then((res) => res.json())
        .then((data) => {
            setIsLoading(false);
            if (data.status === 'error') {
                return toast.error(data.error);
            }
            toast.success('Links saved successfully!');
        })
        .catch(err => {
            setIsLoading(false);
            toast.error('Failed to save links');
        });
    }
    
    useEffect(() => {
        if (!localStorage.getItem('MyMapToken')) {
            return router.push('/login');
        }
        
        setIsLoading(true);
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${backend}/load/links`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('MyMapToken'),
            })
        }).then((res) => res.json())
        .then((data) => {
            setIsLoading(false);
            if (data.status === 'error') {
                return toast.error(data.error);
            }
            setLinks(data.links);
        })
        .catch(err => {
            setIsLoading(false);
            toast.error('Failed to load links');
        });
    }, [router]);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <UserHeader />
            <main className="container mx-auto px-4 py-8">
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                    <div className="flex items-center justify-center mb-8">
                        <FiLink className="text-indigo-600 text-2xl mr-3" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customize Your Links</h1>
                    </div>
                    
                    {isLoading ? (
                        <div className="flex justify-center my-12">
                            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <form onSubmit={saveLinks} className="space-y-6">
                            <AnimatePresence>
                                {links.map((link, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="flex flex-col space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="relative">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FiLink className="text-gray-400" />
                                                        </div>
                                                        <input 
                                                            required
                                                            type="text" 
                                                            value={link.url} 
                                                            onChange={e => handleLink(index, 'url', e.target.value)}
                                                            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                                                            placeholder="https://example.com"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="relative">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FiType className="text-gray-400" />
                                                        </div>
                                                        <input 
                                                            required
                                                            type="text" 
                                                            value={link.title} 
                                                            onChange={e => handleLink(index, 'title', e.target.value)}
                                                            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                                                            placeholder="Link Title"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="relative">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FiImage className="text-gray-400" />
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            value={link.icon} 
                                                            onChange={e => handleLink(index, 'icon', e.target.value)}
                                                            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                                                            placeholder="Icon name or URL"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-end">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    type="button"
                                                    onClick={() => handleRemoveLink(index)}
                                                    className="flex items-center px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200"
                                                >
                                                    <FiTrash2 className="mr-1" />
                                                    <span>Remove</span>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleNewLink}
                                    className="flex-1 flex justify-center items-center px-6 py-3 bg-white border-2 border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-200 shadow-sm"
                                >
                                    <FiPlus className="mr-2" />
                                    <span>Add New Link</span>
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="flex-1 flex justify-center items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                                >
                                    <FiSave className="mr-2" />
                                    <span>Save Changes</span>
                                </motion.button>
                            </div>
                        </form>
                    )}
                </motion.section>
            </main>
        </div>
    );
}

export default Links;