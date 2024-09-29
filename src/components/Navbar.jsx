import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../config/firebaseMethod';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    await signOutUser();
    navigate('/Login');
  };

  return (
    <div className="navbar bg-info">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Blogging App</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              
              <img
                alt="Profile"
                src='https://tse2.mm.bing.net/th?id=OIP.iilJNbdj0e2XNmLaNCopewHaEt&pid=Api&P=0&h=220'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="text-3-x font-bold" to="">Dashboard</Link>
            </li>
            <li>
              <Link className="text-3-x font-bold" to="allblogs">All-Blogs</Link>
            </li>
            <li>
              <Link className="text-3-x font-bold" to="singleuser">Profile</Link>
            </li>
            <li>
              <Link className="text-3-x font-bold" to="login">Login</Link>
            </li>
            <li>
              <Link className="text-3-x font-bold" to="register">Register</Link>
            </li>
            <li>
              <h3 className="text-x font-bold" onClick={logoutUser}>Logout</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
