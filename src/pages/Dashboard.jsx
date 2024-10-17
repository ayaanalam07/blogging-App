import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db, getData, sendData } from '../config/firebaseMethod'
import { collection, getDocs, query, where } from 'firebase/firestore'

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const blogData = await getData("blogs", user.uid)
        console.log(blogData);
        setBlogs([...blogData])

      }
    })
  }, [])

  const sendDataFromFirestore = async (data) => {
    console.log(data);
    try {
      const response = await sendData({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid
      }, 'blogs')
      blogs.push({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid
      })
      setBlogs([...blogs])
      console.log(response);

    } catch (error) {
      console.error(error);

    }
  }

  const [profileImage, setProfileImage] = useState('No-Image')
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
    <>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

        <form
          className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
          onSubmit={handleSubmit(sendDataFromFirestore)}
        >
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter a Title"
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="mb-4">
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        <hr className="my-8" />

        <div>
          <h1 className="text-2xl font-bold text-center mb-6">Blog List</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.length > 0 ? (
              blogs.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={profileImage} alt='No-Image' />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))
            ) : (
              <h1 className="text-center col-span-full text-gray-500">Loading...</h1>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard