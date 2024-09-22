import React, { useEffect, useState } from 'react'
import '../index.css'
import { useForm } from 'react-hook-form'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, getData, sendData } from '../config/firebaseMethod'

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



  return (
    <>
      <div>
        <h1 style={{
          textAlign:"center"
        }}>Dashboard</h1>
        <form className='form' onSubmit={handleSubmit(sendDataFromFirestore)} >
          <input className='textInput' type="text" placeholder="Enter a Title" {...register("title", { required: true })} /><br />
          {errors.title && <span>This field is required</span>}
          <br /><br />
          <textarea className='textArea' placeholder="Enter a description"{...register("description", { required: true })} ></textarea><br />
          {errors.description && <span>This field is required</span>}
<br /><br />
<button type='submit'>Submit</button><br /><br />
        </form>
      </div>
      <hr />
      <div>
        <h1 style={{
          textAlign:"center"
        }}>Blog List</h1>
<div>
  {blogs.length > 0 ? blogs.map((item , index)=>{
    return <div key={index} style={{
    margin:"30px 460px ",
    width:"400px",
    height:"140px",
    border:"1px solid #000",
    textAlign:"center"
    }}>
      <h1>{item.title}</h1>
      <h3>{item.description}</h3>
    </div>


  }): <h1 style={{
    textAlign:"center"
  }}>Loading...</h1> }
</div>
      </div>
    </>
  )
}

export default Dashboard