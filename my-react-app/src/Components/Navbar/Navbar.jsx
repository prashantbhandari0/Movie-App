import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* MovieApp Button */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-red-600 to-pink-600 px-5 py-2 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        MovieAdda
      </Link>

      {/* Right Side Container */}
      <div className="flex items-center gap-4">
        {/* Favourites Link */}
        <Link
          to="/favourites"
          className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Favourites <span className="text-xl">♡</span>
        </Link>

        {/* Profile Icon Link */}
        <Link
          to="/profile" // Navigate directly to profile page
          className="bg-gradient-to-r from-gray-800 to-gray-900 p-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;