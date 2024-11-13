import React from 'react';
import { Tab, Fragment } from '@headlessui/react'

const MyTabs= () => {
  return (
    <Tab.Group className="flex flex-col items-center justify-center">
      <Tab.List className="flex gap-5 mb-5">
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                  ? 'text-indigo-300 underline'
                  : 'text-black hover:text-gray-400'
              }
            >
              Register
            </button>
          )}
        </Tab>
        {/* Profile Tab */}
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                 ? 'text-indigo-300 underline'
                  : 'text-black hover:text-gray-400'
              }
            >
              Profile
            </button>
          )}
        </Tab>
        {/* Links Tab */}
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                 ? 'text-indigo-300 underline'
                  : 'text-black hover:text-gray-400'
              }
            >
              Links
            </button>
          )}
        </Tab>
        {/* Data Tab */}
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                  ? 'text-indigo-300 underline'
                  : 'text-black hover:text-gray-400'
              }
            >
              Data
            </button>
          )}
        </Tab>
        {/* Preview Tab */}
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                  ? 'text-indigo-300 underline'
                  : 'text-black hover:text-gray-400'
              }
            >
              Preview
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="mb-20">
        <Tab.Panel className="flex justify-center items-center">
            <img className="shadow-2xl py-2 border-indigo-300 border-2 rounded-lg w-1/2"src="/png/register.png" ></img>
        </Tab.Panel>
        <Tab.Panel className="flex justify-center items-center">
            <img className="shadow-2xl py-2 border-indigo-300 border-2 rounded-lg w-1/2"src="/png/profile.png" ></img>
        </Tab.Panel>
        <Tab.Panel className="flex justify-center items-center">
            <img className="shadow-2xl py-2 border-indigo-300 border-2 rounded-lg w-1/2"src="/png/links.png" ></img>
        </Tab.Panel>
        <Tab.Panel className="flex justify-center items-center">
            <img className="shadow-2xl py-2 border-indigo-300 border-2 rounded-lg w-1/2"src="/png/data.png" ></img>
        </Tab.Panel>
        <Tab.Panel className="flex justify-center items-center">
            <img className="shadow-2xl py-2 border-indigo-300 border-2 rounded-lg w-1/2"src="/png/preview.png" ></img>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default MyTabs;