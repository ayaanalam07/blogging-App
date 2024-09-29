import React, { useEffect, useState } from 'react';
import { auth, getData } from '../config/firebaseMethod'; // Importing Firebase methods

const SingleUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await getData('users', user.uid); // Fetch data from Firestore using user's UID
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container flex justify-center items-center mt-40">
      {userData ? (
        <div className="user-profile bg-white p-6 rounded-lg shadow-lg">
          <img 
            src={userData.profileImage} 
            alt="Profile" 
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4" 
          />
          <h2 className="text-center text-2xl font-semibold">{userData.fullName}</h2>
          <p className="text-center text-gray-600">{userData.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default SingleUser;
