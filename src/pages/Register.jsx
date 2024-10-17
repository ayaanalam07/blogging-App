import React, { useRef, useState } from 'react';
import { signUpUser, uploadImage } from '../config/firebaseMethod';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const profileImage = useRef();
  const [loading, setLoading] = useState(false);  // Manage loading state

  const navigate = useNavigate();

  const signUserFromFirebase = async (event) => {
    event.preventDefault();
    setLoading(true);  // Start loading when button is clicked

    try {
      // Upload the profile image
      const userProfileImageUrl = await uploadImage(profileImage.current.files[0], email.current.value);

      // Register the user
      const userData = await signUpUser({
        fullName: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
        profileImage: userProfileImageUrl,
      });

      console.log(userData);

      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  // Stop loading when the process is complete
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
            <button type="submit" className="btn btn-info mt-3 w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}  {/* Show loading text */}
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Register;
