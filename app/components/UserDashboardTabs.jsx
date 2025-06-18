"use client";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

const tabs = [
  { name: 'My Published Blogs', href: '#', current: false },
  { name: 'SAVED DRAFTS', href: '#', current: false },
  { name: 'WRITE BLOG', href: '#', current: true },
  { name: 'MY PROFILE', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserDashboardTabs({ onTabChange }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0); // Default to My Published Blogs

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    if (onTabChange) {
      onTabChange(index); //CALLS PARENT'S FUNCTION WITH THE NEW INDEX
    }
  };

  return (
    <div className='flex justify-center w-full max-w-6xl mx-auto px-4'   >
      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          value={tabs[activeTabIndex].name}
          onChange={(e) => {
            const selectedIndex = tabs.findIndex(tab => tab.name === e.target.value);
            handleTabClick(selectedIndex);
          }}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block w-full">
        <nav aria-label="Tabs" className="isolate flex divide-x divide-gray-200 rounded-lg shadow-sm w-full">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tabIdx)}
              aria-current={activeTabIndex === tabIdx ? 'page' : undefined}
              className={classNames(
                activeTabIndex === tabIdx ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white px-6 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 cursor-pointer',
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  activeTabIndex === tabIdx ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
