"use client";
import React, { useState } from 'react'
import UserDashboardTabs from '../components/UserDashboardTabs'
import MyPublishedBlogs from '../components/DashboardComponents/MyPublishedBlogs'
import SavedDraftsBlogs from '../components/DashboardComponents/SavedDraftsBlogs'
import UserProfile from '../components/DashboardComponents/UserProfile'
import Writeblog from '../components/Writeblog'

function Page() {
  const [activeTab, setActiveTab] = useState(0); // Default to My Published Blogs

  function handleTabChange(tabIndex) { // not exicuted first time
    setActiveTab(tabIndex);
  }

  const renderTabContent = () => {  
    switch (activeTab) {
      case 0: // My Published Blogs
        return <MyPublishedBlogs />;
      case 1: // SAVED DRAFTS
        return <SavedDraftsBlogs />;
      case 2: // WRITE BLOG
        return <Writeblog />;
      case 3: // MY PROFILE
        return <UserProfile />;
      default:
        return <MyPublishedBlogs />;
    }
  };

  return (
    <div className='flex-col ml-20 mr-20 justify-center min-h-screen'>
      <div className="mb-8"> 
        <UserDashboardTabs onTabChange={handleTabChange} /> 
      </div>
      
      <div className='flex justify-center p-8 min-h-32'>
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Page