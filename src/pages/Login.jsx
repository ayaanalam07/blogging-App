import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { loginUser } from '../config/firebaseMethod';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,  // Added to reset form inputs
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Manage loading state

  const loginUserFromFirebase = async (data) => {
    setLoading(true);  // Start loading when button is clicked
    console.log(data);

    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log(userLogin);
      
      // Navigate to the dashboard (or in this case, the /allblogs route)
      navigate('/allblogs');

      // Reset form fields after login success
      reset();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);  // Stop loading when process is complete
    }
  };

  return (
    <div className="flex justify-center items-center mt-40">
      <form onSubmit={handleSubmit(loginUserFromFirebase)}>
        <div className="relative h-76 w-96 border border-ghost m-3 p-4 bg-white shadow-lg rounded">
          <br />
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
          <br />
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
          <button
            type="submit"
            className="btn btn-info mt-3 w-full"
            disabled={loading}  // Disable the button during loading
          >
            {loading ? 'Logging in...' : 'Login'}  {/* Show loading text */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
