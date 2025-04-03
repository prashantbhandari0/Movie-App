import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for Signup

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login attempt:", { email, password });
      // Add your login logic here (e.g., API call)
    } else {
      console.log("Signup attempt:", { name, email, password });
      // Add your signup logic here (e.g., API call)
    }
    // Reset form (optional)
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field (Signup Only) */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Link */}
        <p className="text-center mt-4 text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-red-500 hover:text-red-400 font-semibold focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        {/* Back to Home Link */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-400 hover:text-red-500 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;