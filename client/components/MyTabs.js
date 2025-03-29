"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MyTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabItems = [
    { id: "register", label: "Register", image: "/png/register.png" },
    { id: "profile", label: "Profile", image: "/png/profile.png" },
    { id: "links", label: "Links", image: "/png/links.jpeg" },
    { id: "data", label: "Data", image: "/png/data.png" },
    { id: "preview", label: "Preview", image: "/png/preview.png" },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Tab List */}
      <div className="flex gap-5 mb-5">
        {tabItems.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className="relative px-2 py-1 transition-colors duration-200"
          >
            <span className={activeTab === index ? "text-indigo-300 underline" : "text-black hover:text-gray-400"}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mb-20 w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="flex justify-center items-center w-full"
          >
            <img
              src={tabItems[activeTab].image || "/placeholder.svg"}
              alt={tabItems[activeTab].label}
              className="shadow-2xl py-2 border-indigo-300 border-2 rounded-lg w-full md:w-1/2"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MyTabs

