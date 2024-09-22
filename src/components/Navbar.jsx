import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { signOutUser } from '../config/firebaseMethod'

const Navbar = () => {

  const navigate = useNavigate()

  const logoutUser = async () => {
    const user = await signOutUser()
    setIsUser(false)
    console.log(user);
    navigate('/Login')

  }


  return (
    <>
      <div className='box'>
        <h3><Link className='list' to=''>Dashboard</Link></h3>
        <h3><Link className='list' to='allblogs'>All-Blogs</Link></h3>
        <h3><Link className='list' to='singleuser'>Profile</Link></h3>
        <h3><Link className='list' to='login'>Login</Link></h3>
        <h3><Link className='list' to='register'>Register</Link></h3>
        <h3 className='list' onClick={logoutUser}>Logout</h3>

      </div>
      <hr />
    </>
  )
}

export default Navbar