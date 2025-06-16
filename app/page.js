import React from 'react'
import BlogCard from './components/BlogCard'
import Dropdown from './components/Dropdown'
import BlogsList from './components/BlogsList'

function Page() {
  return (
    <div>
      <div className='mt-2 ml-20 mr-20 flex justify-end'>
        <Dropdown />
      </div>     

      <div className='ml-20 mr-20 min-h-[200px] flex'>
        <BlogsList />
      </div>
    </div>
  )
}

export default Page