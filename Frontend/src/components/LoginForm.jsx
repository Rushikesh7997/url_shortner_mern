import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js"
import { useNavigate } from "@tanstack/react-router";


const LoginForm = ({state}) => {

    const [email, setEmail] = useState('ravi@gmail.com');
    const [password, setPassword] = useState('pass123');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const auth = useSelector((state) =>state.auth);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
          const data = await loginUser(password, email);
          dispatch(login(data.user));
          navigate({to:"/dashboard"})
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(err.message || 'Login failed. Please check your credentials.')
        }
    };

  return (
    <>
        <div>
          <h1 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Please sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" " // The placeholder is a space for the label animation
              className="block px-4 py-3 w-full text-lg text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              disabled={loading}
            />
            <label
              htmlFor="email"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
            >
              Email Address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="block px-4 py-3 w-full text-lg text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              minLength="6"
              disabled={loading}
            />
            <label
              htmlFor="password"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:bg-blue-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        
        <p className="cursor-pointer text-center text-gray-500">
          Don't have an account?{' '}
          <span onClick={()=>state(false)} className="font-semibold text-blue-600 hover:underline">
            Sign Up
          </span>
        </p>
    </>
  )
}

export default LoginForm