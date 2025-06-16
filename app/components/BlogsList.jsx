"use client";
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import BlogCard from './BlogCard'

function BlogsList() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasMore: false,
    limit: 10
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
      
      const response = await fetch(`/api/blogs?${params}`);
      const data = await response.json();
      
      if (page === 1) {
        setBlogs(data.blogs);
      } else {
        setBlogs(prev => [...prev, ...data.blogs]);
      }
      
      setPagination(data.pagination);
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