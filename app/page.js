import React, { Suspense } from 'react'
import BlogCard from './components/BlogCard'
import Dropdown from './components/Dropdown'
import BlogsList from './components/BlogsList'

function Page() {
  return (
    <div>
      <div className='mt-2 ml-20 mr-20 flex justify-end'>
        <Suspense fallback={<div>Loading...</div>}>
          <Dropdown />
        </Suspense>
      </div>     

      <div className='ml-20 mr-20 min-h-[200px] flex'>
        <Suspense fallback={<div>Loading blogs...</div>}>
          <BlogsList />
        </Suspense>
      </div>
    </div>
  )
}

export default Page