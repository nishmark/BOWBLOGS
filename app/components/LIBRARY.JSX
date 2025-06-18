/*

-----------write blog page flow-----------

unable to get userd id directly from the database
with session.user.email we can get the user id
but we need to get the user id from the database

session?.user?.id not working
 
1-we are using to get what user is writing in the blog title, content, and image url
    const titleElement = document.getElementById('blogTitle');
    const contentElement = document.getElementById('blogContent');
    const imageElement = document.getElementById('imageUrlInput');

2-we get user email by 
import { useSession } from "next-auth/react";

export default function Writeblog() {
    const { data: session } = useSession();
    const userEmail = session?.user?.email;
}


3-when user saves we get user id from user email

    const user = await getUserById(session?.user?.email);

4-we use post method to save the blog api/blogs.js/route.js-----post

 
      // Send POST request to your API
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlogData)
      });
  
      const result = await response.json();


5-if user saves we set published to false

6-if user publish we set published to true  





*/

/*--------Homee page flow-----------

import Dropdown from './components/Dropdown'
import BlogsList from './components/BlogsList'

export default function Page() {
  return (
    <div>
          <Dropdown />
        
      </div>     

      <div>
        
          <BlogsList />
        
      </div>
    </div>
  )
}

*/

/*-------------dropdown flow-----------

1-import hero icons we are going to use
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

2- we import SEARCH PARAMS to get the current sort text FROM URL
useRouter, useSearchParams from 'next/navigation';

3- we use useEffect to update the current sort text
useEffect(() => {
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    
    if (sortBy && sortOrder) {





2-when user selects a drop down we call function handleSort
  const handleSort = (sortBy, sortOrder) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    
    // Update the URL with new parameters
    router.push(`?${params.toString()}`);
    
    // Update the current sort text immediately
    const sortText = getSortText(sortBy, sortOrder);
    setCurrentSort(sortText);
  };

  when user clicks on a drop down 
   The router.push() uses Next.js client-side navigation, which:
Updates the URL in the browser
Does NOT reload the page
Triggers a re-render of components that depend on URL parameters
2. Component Re-rendering
The BlogsList component listens for URL changes:

useEffect(() => {
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  
  // Reset pagination when sort changes
  setPagination(prev => ({ ...prev, currentPage: 1 }));
  fetchBlogs(1, sortBy, sortOrder);
}, [searchParams]);

When the URL changes:
The useEffect detects the new search parameters
It fetches new data from the API with the updated sort parameters
Only the BlogsList component re-renders with new data
The rest of the page remains unchanged

*/

/*****************BlogsList flow***************

1- we import useSearchParams from 'next/navigation'
  to get input from dropdown

2-. INITIAL LOAD (When Page First Loads)
What actually happens:
Component Mounts: BlogsList component mounts with initial state:
Apply to LIBRARY.JSX
useEffect Runs IMMEDIATELY: The useEffect runs on mount because:
useEffect runs after the component mounts
It doesn't wait for searchParams to "change" - it runs with the initial searchParams value
Even if URL has no parameters, searchParams is still a valid object

3-Initial useEffect execution:

   useEffect(() => {
     const sortBy = searchParams.get('sortBy') || 'createdAt';  // Gets 'createdAt' (default)
     const sortOrder = searchParams.get('sortOrder') || 'desc'; // Gets 'desc' (default)
     
     // Reset pagination
     setPagination(prev => ({ ...prev, currentPage: 1 }));
     
     // IMMEDIATELY fetch blogs with default sorting
     fetchBlogs(1, sortBy, sortOrder);
   }, [searchParams]); // This runs on mount AND when searchParams change

---> API Call Happens: Immediately calls /api/blogs?page=1&sortBy=createdAt&sortOrder=desc

--->Blogs Load: Gets and displays the first 10 blogs





2. DROPDOWN CHANGE (When User Changes Sort)
What happens:
User clicks dropdown option → router.push() updates URL
searchParams object changes (Next.js creates new searchParams object)
useEffect runs again because searchParams dependency changed
New API call with new sorting parameters
Blogs re-fetch and re-render


//page nationflow -----------------

function BlogsList() {
    const [pagination, setPagination] = useState({
    currentPage: 1, // Which page you're currently on
    totalPages: 1, // Total number of pages available
    totalBlogs: 0, // Total number of blogs in the database
    hasMore: false, // Whether there are more blogs to load
    limit: 10 // Number of blogs to load per page
  });

 const fetchBlogs = async (page = 1, sortBy = 'createdAt', sortOrder = 'desc') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        sortBy: sortBy,
        sortOrder: sortOrder
      });
      
      const response = await fetch(`/api/blogs?${params}`);
      const data = await response.json();
      
      if (page === 1) {  // If page === 1: Replaces all blogs (for sorting changes)
        setBlogs(data.blogs);
      } else {  //If page > 1: Appends new blogs to existing ones (for "Load More")
        setBlogs(prev => [...prev, ...data.blogs]);
      }

     
      
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };


Key Points:
Sends page, sortBy, and sortOrder as URL parameters
If page === 1: Replaces all blogs (for sorting changes)
If page > 1: Appends new blogs to existing ones (for "Load More")


  
//*************userDashboard**************************

-----------Prop Drilling (or Passing Callback as a Prop)------

function Parent() {
  function handleChildEvent(value) {
    // Do something with value from child
    console.log("Child sent:", value);
  }

  return (
    <Child onEvent={handleChildEvent} />
  );
}

function Child(props) {
  function handleClick() {
    props.onEvent("Hello from child!");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}

1-when user presses a tab we we call parent by passing ontabchange

2child passes current tab parent renders that tab




*/

