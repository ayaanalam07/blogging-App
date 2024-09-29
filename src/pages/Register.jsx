import React, { useRef } from 'react';
import { signUpUser, uploadImage } from '../config/firebaseMethod';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const profileImage = useRef();

  const navigate = useNavigate();

  const signUserFromFirebase = async (event) => {
    event.preventDefault();

    const userProfileImageUrl = await uploadImage(profileImage.current.files[0], email.current.value);

    try {
      const userData = await signUpUser({
        fullName: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
        profileImage: userProfileImageUrl,
      });

      // Navigate to the profile page after successful registration
      navigate(`Login`);
      
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-40">
      <form onSubmit={signUserFromFirebase}>
        <div className="relative h-90 w-96 border border-ghost m-3 p-4 bg-white shadow-lg rounded">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Username" ref={fullName} />
          </label><br />
          <label className="input input-bordered flex items-center gap-2">
            <input type="email" className="grow" placeholder="Email" ref={email} />
          </label><br />
          <label className="input input-bordered flex items-center gap-2">
            <input type="password" className="grow" placeholder="Password" ref={password} />
          </label><br />
          <label>
            <input type="file" className="file-input file-input-bordered flex items-center gap-2 w-full" ref={profileImage} />
            <button type="submit" className="btn btn-info mt-3 w-full">Register</button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Register;
