import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavouritesContext } from "../../Context/FavouritesContext"; // Adjust path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { favourites } = useContext(FavouritesContext); // Fetch favorites from context
  const navigate = useNavigate();

  // Simulated user data (replace with real auth data)
  const userName = "YourName";

  const handleLogout = () => {
    // Simulate logout (replace with real logout logic)
    toast.success("Logging out", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    // Delay navigation to allow toast to be seen
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Matches toast autoClose duration
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20 px-8"> {/* Added pt-20 */}
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            {userName}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            Logout
          </button>
        </div>

        {/* Recently Watched Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Recently Watched
          </h2>
          <p className="text-gray-400">No recently watched movies</p>
        </div>

        {/* Favourites Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Favourites
          </h2>
          {favourites.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {favourites.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`} className="block">
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <img
                      src={movie.url || `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded-t-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h3 className="text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                        {movie.title}
                      </h3>
                      <p className="text-gray-300 text-xs">{movie.release_date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No favourite movies yet.</p>
          )}
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Profile;