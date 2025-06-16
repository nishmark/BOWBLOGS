"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ReadBlog from '../../components/ReadBlog';

export default function ReadBlogPage() {
  const params = useParams(); // recieves the id from the url
  const { data: session, status } = useSession();
  const [blog, setBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user data from database
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/users?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }
    };

    if (status === 'authenticated' && session?.user?.email) {
      fetchCurrentUser();
    }
  }, [session, status]);

 // this exicutes when you click on readmore button in blogcard that pushes router.push(`/readblogpage/${blogId}`); with url params 
 //as soon as params received you get params.id  the this fetch is exicuted 
 
  useEffect(() => {                  
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog not found');
          } else {
            setError('Failed to fetch blog');
          }
          return;
        }

        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);




  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading blog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-500">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <ReadBlog blog={blog} currentUser={currentUser} />
      </div>
    </div>
  );
}