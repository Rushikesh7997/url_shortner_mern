import { Link } from '@tanstack/react-router';
import React, { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({isLoggedIn, userName, onLogout}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          
          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              URL Shortener
            </Link>
          </div>

          {/* Middle: Navigation Links (Desktop) */}
          <div className='flex items-center'>
            <div className="hidden md:flex md:justify-center md:flex-auto">
                <div className="flex items-baseline space-x-8">
                    <Link
                    to="/"
                    className="text-white hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium transition-colors">
                        Home
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex md:justify-center md:flex-auto">
                <div className="flex items-baseline space-x-8">
                    <Link
                    to="/"
                    className="text-white hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium transition-colors">
                        About Us
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex md:justify-center md:flex-auto">
                <div className="flex items-baseline space-x-8">
                    <Link
                    to="/"
                    className="text-white hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium transition-colors">
                        Our Products
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex md:justify-center md:flex-auto">
                <div className="flex items-baseline space-x-8">
                    <Link
                    to="/"
                    className="text-white hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>
          </div>

          {/* Right Side: Login Button (Desktop) */}
          {/* <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Login
            </button>
          </div> */}

          <div className="hidden md:block">
            {
                isLoggedIn ? (
                    <div className='flex items-center space-x-4'>
                        <span className='text-gray-700'>Welcome, {userName || "User"}</span>
                        <button 
                            onClick={onLogout}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/auth"
                        className = "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                            Login
                    </Link>
                )
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-600 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Home
              </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-600 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                About Us
              </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-600 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Our Product
              </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-600 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Contact Us
              </Link>
          </div>
          <div className="px-4 pb-4">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar