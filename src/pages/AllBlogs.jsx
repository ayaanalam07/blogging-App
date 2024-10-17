import React, { useEffect, useState } from 'react';
import { auth, db, getAllData } from '../config/firebaseMethod';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

  const [profileImage, setProfileImage] = useState('no-image')
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const uid = currentUser.uid;

        try {
          const q = query(collection(db, "users"), where("id", "==", uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.profileImage) {
                setProfileImage(data.profileImage);
              }
            });
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);


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
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={profileImage} alt='no-image' />
                </div>
              </div>
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
