import React from 'react';
import { BookOpenIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function DashbordBlogCard({ blog, onRead, onEdit, onDelete, dateLabel = 'Published on' }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
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
          {dateLabel} {new Date(dateLabel === 'Published on' ? blog.createdAt : blog.updatedAt).toLocaleDateString()}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={onRead}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span>Read</span>
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm font-medium"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbordBlogCard;
