"use client";
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import BlogCard from './BlogCard'

function BlogsList() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1, // Which page you're currently on
    totalPages: 1, // Total number of pages available
    totalBlogs: 0, // Total number of blogs in the database
    hasMore: false, // Whether there are more blogs to load
    limit: 10 // Number of blogs to load per page
  });

  // Fetch blogs from API
  const fetchBlogs = async (page = 1, sortBy = 'createdAt', sortOrder = 'desc') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        sortBy: sortBy,
        sortOrder: sortOrder
      });
      
      const response = await fetch(`/api/blogs?${params}`); //send page number to say which blogs to skip and load
      const data = await response.json();
      
      if (page === 1) {  // If page === 1: Replaces all blogs (for sorting changes)
        setBlogs(data.blogs);
      } else {  //If page > 1: Appends new blogs to existing ones (for "Load More")
        setBlogs(prev => [...prev, ...data.blogs]);
      }

     
      
      setPagination(data.pagination); //set the pagination data to the state
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load blogs on component mount and when sort parameters change
  useEffect(() => {
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Reset pagination when sort changes
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchBlogs(1, sortBy, sortOrder);
  }, [searchParams]);

  // Handle show more
  const handleShowMore = () => {
    if (pagination.hasMore) {
      const sortBy = searchParams.get('sortBy') || 'createdAt';
      const sortOrder = searchParams.get('sortOrder') || 'desc';
      fetchBlogs(pagination.currentPage + 1, sortBy, sortOrder);
    }
  };

  return (
    <div className="w-full">
      
      
      {loading && blogs.length === 0 ? (
        <div className="flex justify-center items-center w-full py-12">
          <div className="text-lg">Loading blogs...</div>
        </div>
      ) : (
        <>
          <BlogCard blogs={blogs} />
          
          {pagination.hasMore && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={handleShowMore}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Show More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BlogsList