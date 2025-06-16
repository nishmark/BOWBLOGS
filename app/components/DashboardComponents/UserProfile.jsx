"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

function UserProfile() {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const params = new URLSearchParams({
        email: session.user.email
      });
      
      const response = await fetch(`/api/users/profile?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setProfileData(data);
      } else {
        setError(data.error || 'Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  // Load profile when session is available
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserProfile();
    }
  }, [session, status]);

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
        <div className="text-lg text-red-500">Please log in to view your profile</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-lg">Loading your profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-lg text-gray-500">No profile data available</div>
      </div>
    );
  }

  const { user, statistics, recentActivity, allBlogs } = profileData;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Image
              src={user.image}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/120x120/cccccc/666666?text=User';
              }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>Member since {user.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Blogs</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.totalBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.publishedBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <PencilIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.draftBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {recentActivity.latestBlog ? (
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Latest blog: <span className="font-medium text-gray-900">{recentActivity.latestBlog.title}</span></p>
              <p className="text-xs text-gray-500">
                {recentActivity.latestBlog.isPublished ? 'Published' : 'Draft'} • Last updated: {recentActivity.latestBlog.updatedAt}
              </p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              recentActivity.latestBlog.isPublished 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {recentActivity.latestBlog.isPublished ? 'Published' : 'Draft'}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No blogs yet. Start writing your first blog!</p>
        )}
      </div>

      {/* All Blogs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Blogs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allBlogs.length > 0 ? (
                allBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            src={blog.image || 'https://via.placeholder.com/40x40/cccccc/666666?text=Blog'}
                            alt={blog.title}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40x40/cccccc/666666?text=Blog';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">ID: {blog.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        blog.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.updatedAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No blogs found. Start writing your first blog!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">User Information</h3>
            <dl className="space-y-2">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-gray-400" />
                <dt className="text-sm font-medium text-gray-600">Name:</dt>
                <dd className="text-sm text-gray-900">{user.name}</dd>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                <dt className="text-sm font-medium text-gray-600">Email:</dt>
                <dd className="text-sm text-gray-900">{user.email}</dd>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <dt className="text-sm font-medium text-gray-600">Member Since:</dt>
                <dd className="text-sm text-gray-900">{user.memberSince}</dd>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <dt className="text-sm font-medium text-gray-600">Last Active:</dt>
                <dd className="text-sm text-gray-900">{user.lastActive}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Account Statistics</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-600">Total Blogs:</dt>
                <dd className="text-sm text-gray-900">{statistics.totalBlogs}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Published Blogs:</dt>
                <dd className="text-sm text-gray-900">{statistics.publishedBlogs}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Draft Blogs:</dt>
                <dd className="text-sm text-gray-900">{statistics.draftBlogs}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Completion Rate:</dt>
                <dd className="text-sm text-gray-900">{statistics.completionRate}%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;