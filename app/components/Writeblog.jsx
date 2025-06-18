/*
unable to get userd id directly from the database
with session.user.email we can get the user id
but we need to get the user id from the database

session?.user?.id not working

when j


*/


'use client'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid' 
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Writeblog() {
  const DEFAULT_IMAGE = "https://www.purina.in/sites/default/files/2020-11/Toy%20Dogs%20Everything%20You%20Need%20to%20KnowHERO.jpg";

  const { data: session } = useSession();
  const router = useRouter();

  const [showImageInput, setShowImageInput] = useState(false);
  const [justwrittenblog, setJustWrittenBlog] = useState({
    image: '',
    title: '',
    body: '',
    authorId: '',
    
   });


  // Default image for preview
  const [previewImageSrc, setPreviewImageSrc] = useState(DEFAULT_IMAGE);
  
  // Fallback function to get user ID by email
  async function getUserById(email) {
    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`); // api/users.js
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
  }

  async function saveButtonPressed() {
    if (!session?.user?.name) {
      alert('Please log in to save a blog');
      return;
    }
    
    const titleElement = document.getElementById('blogTitle');
    const contentElement = document.getElementById('blogContent');
    const imageElement = document.getElementById('imageUrlInput');
    
    if (!titleElement?.value.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!contentElement?.value.trim()) {
      alert('Please enter content');
      return;
    }
    
    // Get user ID by email
    const userId = await getUserById(session.user.email);
    if (!userId) {
      alert('Error: Could not find user. Please try refreshing the page.');
      return;
    }
  
    const newBlogData = {
      title: titleElement.value,
      body: contentElement.value,
      image: imageElement?.value || previewImageSrc,
      authorId: userId,
      isPublished: false
    };
    
    setJustWrittenBlog(newBlogData);
    sendBlogToServer(newBlogData);
  }

  async function sendBlogToServer(newBlogData) {
    console.log("sendBlogToServer", newBlogData);
    
    try {
      // Show loading state 
      const saveBtn = document.getElementById('saveBtn');
      const publishBtn = document.getElementById('publishBtn');
      
      if (saveBtn) saveBtn.disabled = true;  //disable the save btn
      if (publishBtn) publishBtn.disabled = true; //disable the publish button
      
      // Send POST request to your API
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlogData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Success
        console.log('Blog saved successfully:', result);
        
        if (newBlogData.isPublished) {
          alert('Blog published successfully! 🎉');
        } else {
          alert('Blog saved as draft successfully! 📝');
        }
        
        // Clear the form after successful save
        clearButtonPressed();

        //http://localhost:3000/userdashboard -------USER DASHBOARD
      //  router.push('/userdashboard');
        
        // Redirect to blog list or blog detail page
        // router.push('/blogs');
         //router.push(`/blogs/${result.id}`);
         //http://localhost:3000/readblogpage/1
         router.push(`/readblogpage/${result.id}`);
        
      } else {
        // Error from server
        console.error('Server error:', result.error);
        alert(`Error: ${result.error}`);
      }
      
    } catch (error) {
      // Network or other errors
      console.error('Network error:', error);
      alert('Failed to save blog. Please check your internet connection and try again.');
    } finally {
      // Re-enable buttons
      const saveBtn = document.getElementById('saveBtn');
      const publishBtn = document.getElementById('publishBtn');
      
      if (saveBtn) saveBtn.disabled = false; //enable the save btn
      if (publishBtn) publishBtn.disabled = false; //enable the publish btn
    }
  }

  



  async function publishButtonPressed() {
    if (!session?.user?.name) {
      alert('Please log in to publish a blog');
      return;
    }
    
    const titleElement = document.getElementById('blogTitle');
    const contentElement = document.getElementById('blogContent');
    const imageElement = document.getElementById('imageUrlInput');
    
    if (!titleElement?.value.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!contentElement?.value.trim()) {
      alert('Please enter content');
      return;
    }
    
    // Get user ID by email
    const userId = await getUserById(session.user.email);
    if (!userId) {
      alert('Error: Could not find user. Please try refreshing the page.');
      return;
    }
  
    const newBlogData = {
      title: titleElement.value,
      body: contentElement.value,
      image: imageElement?.value || previewImageSrc,
      authorId: userId,
      isPublished: true
    };
    
    setJustWrittenBlog(newBlogData);
    sendBlogToServer(newBlogData);
  }



  function clearButtonPressed() {
    const titleElement = document.getElementById('blogTitle');
    const contentElement = document.getElementById('blogContent');
    const imageElement = document.getElementById('imageUrlInput');
    
    if (titleElement) titleElement.value = '';
    if (contentElement) contentElement.value = '';
    if (imageElement) imageElement.value = '';
    
    setPreviewImageSrc(DEFAULT_IMAGE);
  }


  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

                {/* cover photo box */}
                <div className="flex flex-col items-center">
                  <Image
                    key={previewImageSrc}
                    src={previewImageSrc}
                    id="imageUrl"
                    alt="Blog cover"
                    width= {600}
                    height= {200}
                    unoptimized
                    className="max-h-[200px] object-contain rounded-lg cursor-pointer w-full  "//change text color to white
                    onClick={clickedOnCoverPhoto}
                  />
                  <input
                    type="text"
                    id="imageUrlInput"
                    placeholder="Enter image URL"
                    className={`mt-4 px-4 py-2 border rounded-md w-full text-black ${showImageInput ? 'block' : 'hidden'}`} //change text color to white
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
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                BLOG TITLE
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="blogTitle"
                    name="blogTitle"
                    type="text"
                    placeholder="write a awesome title"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                BLOG CONTENT
              </label>
              <div className="mt-2">
                <textarea
                    id="blogContent"
                  name="blogContent"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">keep it short and awesome.</p>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                AUTHOR NAME : <span className="font-bold">{session?.user?.name.toUpperCase() || 'unknown'}</span>  
              </label>
            </div>

    
          </div>
        </div>

      

        
      </div>

      <div className="mt-6 flex items-center justify-between gap-x-6">
      
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600" // move to the starting left side in thi div
          onClick={clearButtonPressed}
        >
          Clear
        </button>
        <button
          type="button"
          id="saveBtn"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={saveButtonPressed}
        >
          Save
        </button>

        <button
          type="button"
          id="publishBtn" 
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={publishButtonPressed}
        >
          Publish
        </button>
      </div>
    </form>
  )
}


/***********program flow*************************
 * 
 * 
 * 
 * 
 * 
 *  */