"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import MyTabs from '@/components/MyTabs'
import Footer from '@/components/Footer'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.98 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 pt-10 sm:pt-20"
      >
        {/* Hero Section */}
        <motion.div 
          className="flex flex-col items-center justify-center mb-16"
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12"
            variants={itemVariants}
          >
            <motion.div
              initial={{ rotate: -5, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image 
                src="/png/mymap-logo.png" 
                alt="MyMap Logo" 
                width={320} 
                height={320} 
                className="w-80 object-contain"
                priority
              />
            </motion.div>
            
            <motion.div 
              className="flex justify-center items-center flex-col"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-center font-bold text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                CREATE YOUR SOCIAL MAP
              </motion.h1>
              
              <motion.h3 
                className="flex justify-center text-sm text-indigo-600 font-medium lg:mb-0 md:mb-0 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                100% Free
              </motion.h3>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full max-w-md mx-auto"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link 
                className="w-full flex justify-center items-center p-5 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg text-white text-xl font-medium shadow-lg relative overflow-hidden group"
                href="/register"
              >
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ mixBlendMode: "overlay" }}
                />
                <motion.span className="relative z-10 flex items-center">
                  Get Started
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Easy to Use Section */}
        <motion.div 
          className="mt-20 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-center font-bold text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400"
            initial={{ letterSpacing: "0.2em", opacity: 0 }}
            whileInView={{ letterSpacing: "0.05em", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            EASY TO USE
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        {/* Tabs Section with Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <MyTabs />
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
        </motion.div>
      </motion.div>
    </div>
  )
}
