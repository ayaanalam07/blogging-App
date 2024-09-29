import React, { useState } from 'react';
import { getAllData } from '../config/firebaseMethod';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const renderBlogs = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const data = await getAllData('blogs'); 
      setBlogs(data);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="mt-5 px-4">
  <div className="flex justify-center mb-4">
    <button 
      onClick={renderBlogs} 
      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {loading ? 'Loading...' : 'Load Blogs'}
    </button>
  </div>

  {error && <p className="text-center text-red-500">{error}</p>}

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {blogs.length > 0 ? (
      blogs.map(blog => (
        <div key={blog.id} className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
          <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-700">{blog.description}</p>
        </div>
      ))
    ) : (
      !loading && <p className="text-center  text-gray-500">No blogs available. Click the button to load blogs.</p>
    )}
  </div>
</div>
  
  );
};





export default AllBlogs;
