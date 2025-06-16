"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { HeartIcon, BookOpenIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function MyPublishedBlogs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasMore: false,
    limit: 10
  });

  // Fallback function to get user ID by email
  async function getUserById(email) {
    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const userData = await response.json();
        return userData.id;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  }

  // Fetch user's published blogs
  const fetchUserBlogs = async (page = 1) => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      
      // Get user ID by email
      const userId = await getUserById(session.user.email);
      if (!userId) {
        console.error('Could not find user ID');
        return;
      }

      const params = new URLSearchParams({
        userId: userId,
        page: page.toString()
      });
      
      const response = await fetch(`/api/blogs/user?${params}`);
      const data = await response.json();
      
      if (page === 1) {
        setBlogs(data.blogs);
      } else {
        setBlogs(prev => [...prev, ...data.blogs]);
      }
      
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load blogs when session is available
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserBlogs(1);
    }
  }, [session, status]);

  // Handle show more
  const handleShowMore = () => {
    if (pagination.hasMore) {
      fetchUserBlogs(pagination.currentPage + 1);
    }
  };

  // Handle read more
  const handleReadMore = (e, blogId) => {
    e.preventDefault();
    router.push(`/readblogpage/${blogId}`);
  };

  // Handle edit blog
  const handleEditBlog = (blogId) => {
    router.push(`/editpage/${blogId}`);
  };

  // Handle delete blog
  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the blog from the list
        setBlogs(prev => prev.filter(blog => blog.id !== blogId));
        alert('Blog deleted successfully!');
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-lg text-red-500">Please log in to view your published blogs</div>
      </div>
    );
  }

  return (
    <div className="w-full">
    

      {loading && blogs.length === 0 ? (
        <div className="flex justify-center items-center w-full py-12">
          <div className="text-lg">Loading your blogs...</div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex justify-center items-center w-full py-12">
          <div className="text-center">
            <div className="text-lg text-gray-500 mb-4">No published blogs found</div>
            <p className="text-gray-400">Start writing and publishing your first blog!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <Image
                      alt={blog.title}
                      src={blog.image || 'https://via.placeholder.com/400x400/cccccc/666666?text=Blog+Image'}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/cccccc/666666?text=Blog+Image';
                      }}
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Published on {new Date(blog.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleReadMore(e, blog.id)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <BookOpenIcon className="w-4 h-4" />
                        <span>Read</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditBlog(blog.id)}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
  );
}

export default MyPublishedBlogs;