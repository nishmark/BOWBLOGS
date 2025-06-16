'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from "next-auth/react"





const navigation = [
  { name: 'Dashboard', href: '/userdashboard', current: true }, //C:\Users\XELTAWEB\Desktop\NEXT_JS\njblo6\app\userdashboard\page.js
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/api/auth/signout' },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: session, status } = useSession()

  const [user, setUser] = useState({
    name: '',
    email: '',
    imageUrl: '',
  })

  /*
  console.log("session",session) // {user: {name: 'John Doe', email: 'john@example.com', image: 'https://example.com/image.jpg'}, expires: '2025-06-15T12:00:00.000Z'}
  console.log("status",status)  // loading, authenticated, unauthenticated
  console.log("session?.user",session?.user)
  console.log("session?.user?.name",session?.user?.name)
  console.log("session?.user?.email",session?.user?.email)
  console.log("session?.user?.image",session?.user?.image)
  */
 

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setIsLoggedIn(true);
      setUser({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        imageUrl: session?.user?.image || 'https://png.pngtree.com/png-clipart/20230513/ourmid/pngtree-smile-dog-on-white-background-png-image_7096061.png',
      })
  
     
  
      // Save user data to database when user is authenticated
      if (session?.user?.email) {
        saveUser({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        });
      }
    } else if (status === 'unauthenticated') {
      setIsLoggedIn(false)
    }
  
   }, [status, session])



  
  // Function to save user data to database
  const saveUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          image: userData.image,
        }),
      });

      if (response.ok) {
        const savedUser = await response.json();
        console.log('User saved successfully:', savedUser);
      } else {
        const error = await response.json();
        console.error('Error saving user:', error);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  


 

 function LoginButtonPressed() {
  router.push('/loginpage');
 }

  function NewBlogButtonPressed() {
    router.push('/writepage');  //C:\Users\XELTAWEB\Desktop\NEXT_JS\njblo6\app\writepage\page.jsx
  }

  function myDashboardButtonPressed() {
    router.push('/userdashboard');  //C:\Users\XELTAWEB\Desktop\NEXT_JS\njblo6\app\userdashboard\page.js
  }


  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="mr-2 -ml-2 flex items-center md:hidden bg-red-500">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://cdn-icons-png.flaticon.com/512/3093/3093444.png"
                className="h-8 w-auto"
              />
              <Link href="/">
              <h1 className="text-white text-2xl font-bold ml-4">BOW BLOGS</h1> </Link>
            </div>
   
          </div>


          <div className="flex items-center">  {/* show this div only when isLoggedIn is true else else show a loggin button in this div */}
        
            {isLoggedIn ? (
              <>
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => myDashboardButtonPressed()}
                    className="relative inline-flex items-center mr-5 gap-x-1.5 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    
                    My Dashboard
                  </button>
                </div>




                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => NewBlogButtonPressed()}
                    className="relative inline-flex items-center gap-x-1.5 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
                    New Blog
                  </button>
                </div>

                
                <div className="hidden md:ml-4 md:flex md:shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  <p className="text-white text-2xl font-bold ml-4">{session?.user?.name}</p>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={session?.user?.image} className="size-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => LoginButtonPressed()} 
                className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            )}
          </div>

          
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="flex items-center px-5 sm:px-6">
            <div className="shrink-0">
              <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">{user.name}</div>
              <div className="text-sm font-medium text-gray-400">{user.email}</div>
            </div>
            <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2 sm:px-3">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
      </div>
    </Disclosure>
  )
}
