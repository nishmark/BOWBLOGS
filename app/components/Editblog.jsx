'use client'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid' 
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Editblog() {
  const DEFAULT_IMAGE = "https://www.purina.in/sites/default/files/2020-11/Toy%20Dogs%20Everything%20You%20Need%20to%20KnowHERO.jpg";

  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [showImageInput, setShowImageInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [blogData, setBlogData] = useState({
    id: '',
    title: '',
    body: '',
    image: '',
    isPublished: false,
    authorId: '',
  });

  // Default image for preview
  const [previewImageSrc, setPreviewImageSrc] = useState(DEFAULT_IMAGE);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch blog data on component mount
  useEffect(() => {
    if (blogId) {
      fetchBlogData();
    } else {
      setError('No blog ID provided');
      setIsLoading(false);
    }
  }, [blogId]);

  async function fetchBlogData() {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`/api/blogs/${blogId}`);
      const data = await response.json();

      if (response.ok) {
        setBlogData({
          id: data.id,
          title: data.title,
          body: data.body,
          image: data.image,
          isPublished: data.isPublished,
          authorId: data.authorId,
        });
        setPreviewImageSrc(data.image || DEFAULT_IMAGE);
      } else {
        setError(data.error || 'Failed to fetch blog data');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog data. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  }

  function clickedOnCoverPhoto() {
    console.log("clickedOnCoverPhoto")
    setShowImageInput(!showImageInput);
    const imageUrlInput = document.getElementById('imageUrlInput');
    if (imageUrlInput) {
      imageUrlInput.value = '';
    }
  }

  function clickedOnSubmitImage() {
    console.log("clickedOnSubmitImage")
    setShowImageInput(false);
    const imageUrlInput = document.getElementById('imageUrlInput');
    const imageUrl = imageUrlInput?.value || DEFAULT_IMAGE;
    
    setPreviewImageSrc(imageUrl);
    setBlogData(prev => ({ ...prev, image: imageUrl }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    if (!session?.user?.name) {
      setError('Please log in to edit a blog');
      return false;
    }
    
    if (!blogData.title.trim()) {
      setError('Please enter a title');
      return false;
    }
    
    if (!blogData.body.trim()) {
      setError('Please enter content');
      return false;
    }

    return true;
  }

  async function saveButtonPressed() {
    if (!validateForm()) return;

    const updatedBlogData = {
      title: blogData.title,
      body: blogData.body,
      image: blogData.image || previewImageSrc,
      isPublished: false
    };

    await updateBlog(updatedBlogData, 'Blog saved as draft successfully! 📝');
  }

  async function publishButtonPressed() {
    if (!validateForm()) return;

    const updatedBlogData = {
      title: blogData.title,
      body: blogData.body,
      image: blogData.image || previewImageSrc,
      isPublished: true
    };

    await updateBlog(updatedBlogData, 'Blog published successfully! 🎉');
  }

  async function updateBlog(updatedBlogData, successMessage) {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlogData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Blog updated successfully:', result);
        setSuccessMessage(successMessage);
        setBlogData(prev => ({ ...prev, ...updatedBlogData }));
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        
      } else {
        console.error('Server error:', result.error);
        setError(`Error: ${result.error}`);
      }
      
    } catch (error) {
      console.error('Network error:', error);
      setError('Failed to update blog. Please check your internet connection and try again.');
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteButtonPressed() {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Blog deleted successfully:', result);
        alert('Blog deleted successfully!');
        router.push('/userdashboard'); // Redirect to dashboard
      } else {
        console.error('Server error:', result.error);
        setError(`Error: ${result.error}`);
      }
      
    } catch (error) {
      console.error('Network error:', error);
      setError('Failed to delete blog. Please check your internet connection and try again.');
    } finally {
      setIsSaving(false);
    }
  }

  function clearButtonPressed() {
    if (confirm('Are you sure you want to clear all changes? This will reset the form to the original blog data.')) {
      fetchBlogData();
      setError('');
      setSuccessMessage('');
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (error && !blogData.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={() => router.push('/userdashboard')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog</h1>
        <p className="text-gray-600">Make changes to your blog post below</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}

      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            {/* Cover photo box */}
            <div className="flex flex-col items-center">
              <Image
                key={previewImageSrc}
                src={previewImageSrc}
                id="imageUrl"
                alt="Blog cover"
                width={600}
                height={200}
                unoptimized
                className="max-h-[200px] object-contain rounded-lg cursor-pointer w-full"
                onClick={clickedOnCoverPhoto}
              />
              <input
                type="text"
                id="imageUrlInput"
                placeholder="Enter image URL"
                className={`mt-4 px-4 py-2 border rounded-md w-full text-black ${showImageInput ? 'block' : 'hidden'}`}
              />
              <button
                type="button"
                id="submitImageBtn"
                className={`mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md ${showImageInput ? 'block' : 'hidden'}`}
                onClick={clickedOnSubmitImage}
              >
                Update Image
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                  BLOG TITLE
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="blogTitle"
                      name="title"
                      type="text"
                      value={blogData.title}
                      onChange={handleInputChange}
                      placeholder="Write an awesome title"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="body" className="block text-sm/6 font-medium text-gray-900">
                  BLOG CONTENT
                </label>
                <div className="mt-2">
                  <textarea
                    id="blogContent"
                    name="body"
                    rows={8}
                    value={blogData.body}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Write your blog content here..."
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">Keep it engaging and informative.</p>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                  AUTHOR NAME : <span className="font-bold">{session?.user?.name?.toUpperCase() || 'unknown'}</span>
                </label>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                  CURRENT STATUS : <span className={`font-bold ${blogData.isPublished ? 'text-green-600' : 'text-orange-600'}`}>
                    {blogData.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div className="flex gap-x-4">
            <button
              type="button"
              className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={clearButtonPressed}
              disabled={isSaving}
            >
              Reset Changes
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={deleteButtonPressed}
              disabled={isSaving}
            >
              Delete Blog
            </button>
          </div>

          <div className="flex gap-x-4">
            <button
              type="button"
              id="saveBtn"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={saveButtonPressed}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save as Draft'}
            </button>

            <button
              type="button"
              id="publishBtn"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={publishButtonPressed}
              disabled={isSaving}
            >
              {isSaving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}