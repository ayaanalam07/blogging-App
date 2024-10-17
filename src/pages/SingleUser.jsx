import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseMethod'; // Importing Firebase methods
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

const SingleUser = () => {

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
    <div className="profile-container flex justify-center items-center mt-40">
      {user ? (
        <div className="user-profile bg-white p-6 rounded-lg shadow-lg">
          <img 
            src={profileImage}
            alt="Profile" 
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4" 
          />
          <h2 className="text-center text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-center text-gray-600">{user.email}</p>
          <p className="text-center text-gray-600">{user.id}</p>

        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default SingleUser;
