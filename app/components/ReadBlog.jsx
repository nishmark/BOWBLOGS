"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

function ReadBlog({ blog, currentUser }) {
  const router = useRouter();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get author name from the blog data structure
  const getAuthorName = () => {
    if (blog?.author?.name) {
      return blog.author.name;
    }
    return 'Unknown Author';
  }

  // Get author initial for avatar
  const getAuthorInitial = () => {
    const authorName = getAuthorName();
    return authorName.charAt(0).toUpperCase();
  }

  // Check if current user is the author of the blog
  const isAuthor = () => {
    if (!currentUser || !blog?.author) return false;
    
    // Compare user IDs (support both 'id' and '_id' fields)
    const currentUserId = currentUser.id || currentUser._id;
    const authorId = blog.author.id || blog.author._id;
    
    return currentUserId === authorId;
  }

  // Handle edit button click
  const handleEdit = () => {
    router.push(`/editpage/${blog.id}`);
  };

  // Handle delete button click
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog deleted successfully!');
        router.push('/'); // Redirect to home page after deletion
      } else {
        const errorData = await response.json();
        alert(`Failed to delete blog: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  // If no blog data is provided, show a message
  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No blog data available</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Blog Image */}
      <div className="relative mx-auto  shrink-0 object-cover">
        <img 
          src={blog.image || 'https://via.placeholder.com/800x400/cccccc/666666?text=Blog+Image'} 
          alt={blog.title}
          className="w-full h-full object-contain  max-h-[250px]"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400/cccccc/666666?text=Blog+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Content Container */}
      <div className="p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight justify-center flex">
          {blog.title}
        </h1>

        {/* Author and Date Info */}
        <div className="flex items-center mb-8 pb-6 border-b border-gray-200 justify-center ">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {getAuthorInitial()}
              </span>
            </div>
            <div >
              <p className="text-lg font-semibold text-gray-900 justify-center flex">{getAuthorName()}</p>
              <p className="text-sm text-gray-500 justify-center flex ">{formatDate(blog.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
            {blog.body}
          </div>
        </div>

        {/* Divider */}
        <div className='flex justify-center mt-8'>
          <div className="w-full border-t border-gray-200"></div>
        </div>
      </div>
      
      {/* Edit and Delete buttons - only show if current user is the author */}
      {isAuthor() && (
        <div className='flex justify-center mt-8 mb-8 gap-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors' onClick={handleEdit}>
            Edit
          </button>
          <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors' onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ReadBlog