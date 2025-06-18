"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookOpenIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import DashbordBlogCard from './DashbordBlogCard';

function SavedDraftsBlogs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDrafts: 0,
    hasMore: false,
    limit: 10
  });

  // Fallback function to get user ID by email
  async function getUserIdByEmail(email) {
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

  // Fetch user's saved drafts
  const fetchUserDrafts = async (page = 1) => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      
      // Get user ID by email
      const userId = await getUserIdByEmail(session.user.email);
      if (!userId) {
        console.error('Could not find user ID');
        return;
      }

      const params = new URLSearchParams({
        userId: userId,
        page: page.toString()
      });
      
      const response = await fetch(`/api/blogs/user/drafts?${params}`);
      const data = await response.json();
      
      if (page === 1) {
        setDrafts(data.drafts);
      } else {
        setDrafts(prev => [...prev, ...data.drafts]);
      }
      
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching user drafts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load drafts when session is available
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserDrafts(1);
    }
  }, [session, status]);

  // Handle show more
  const handleShowMore = () => {
    if (pagination.hasMore) {
      fetchUserDrafts(pagination.currentPage + 1);
    }
  };

  // Handle edit draft
  const handleEditDraft = (draftId) => {
    router.push(`/editpage/${draftId}`);
  };

  // Handle delete draft
  const handleDeleteDraft = async (draftId) => {
    if (!confirm('Are you sure you want to delete this draft?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${draftId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the draft from the list
        setDrafts(prev => prev.filter(draft => draft.id !== draftId));
        alert('Draft deleted successfully!');
      } else {
        alert('Failed to delete draft');
      }
    } catch (error) {
      console.error('Error deleting draft:', error);
      alert('Failed to delete draft');
    }
  };

  // Handle publish draft
  const handlePublishDraft = async (draftId) => {
    if (!confirm('Are you sure you want to publish this draft?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${draftId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: true,
        }),
      });

      if (response.ok) {
        // Remove the draft from the list since it's now published
        setDrafts(prev => prev.filter(draft => draft.id !== draftId));
        alert('Draft published successfully!');
      } else {
        alert('Failed to publish draft');
      }
    } catch (error) {
      console.error('Error publishing draft:', error);
      alert('Failed to publish draft');
    }
  };

  const handleReadDraft = (e, draftId) => {
    e.preventDefault();
    router.push(`/readblogpage/${draftId}`);
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
        <div className="text-lg text-red-500">Please log in to view your saved drafts</div>
      </div>
    );
  }

  return (
    <div className="w-full">
     

      {loading && drafts.length === 0 ? (
        <div className="flex justify-center items-center w-full py-12">
          <div className="text-lg">Loading your drafts...</div>
        </div>
      ) : drafts.length === 0 ? (
        <div className="flex justify-center items-center w-full py-12">
          <div className="text-center">
            <div className="text-lg text-gray-500 mb-4">No saved drafts found</div>
            <p className="text-gray-400">Start writing to create your first draft!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => (
              <div key={draft.id}>
                <DashbordBlogCard
                  blog={draft}
                  onRead={(e) => handleReadDraft(e, draft.id)}
                  onEdit={() => handleEditDraft(draft.id)}
                  onDelete={() => handleDeleteDraft(draft.id)}
                  dateLabel="Updated on"
                />
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => handlePublishDraft(draft.id)}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm font-medium border border-purple-200 rounded px-3 py-1"
                  >
                    <BookOpenIcon className="w-4 h-4" />
                    <span>Publish</span>
                  </button>
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

export default SavedDraftsBlogs;