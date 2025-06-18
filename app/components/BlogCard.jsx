"use client";
import { HeartIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BlogCard({ blogs }) {
  const router = useRouter();

  const handleReadMore = (e, blogId) => {
    e.preventDefault();
    router.push(`/readblogpage/${blogId}`);
  };

  if (!blogs || blogs.length === 0) { // if no blogs are found
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-lg text-gray-500">No blogs found</div>
      </div>
    );
  }

  return (
    <div className="px-[100px]">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <Image
                alt={blog.title}
                src={blog.image || 'https://via.placeholder.com/400x400/cccccc/666666?text=Blog+Image'}
                width={128}
                height={128}
                className="mx-auto size-48 shrink-0  object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/cccccc/666666?text=Blog+Image';
                }}
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900 line-clamp-2">
                {blog.title}
              </h3>
              <dl className="mt-1 flex grow flex-col justify-between">
                <dt className="sr-only">Author</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                    {blog.author?.name || 'Unknown Author'}
                  </span>
                </dd>
                <dd className="mt-2 text-xs text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <HeartIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    LIKE
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    onClick={(e) => handleReadMore(e, blog.id)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <BookOpenIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
