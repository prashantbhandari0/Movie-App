import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../Context/FavouritesContext";
import { toast } from "react-toastify"; // Only import toast, not ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Keep the CSS import

const MovieCard = ({ movie }) => {
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);
  const [isHovered, setIsHovered] = useState(false);
  const isFavourite = favourites.some((fav) => fav.id === movie.id);

  const handleFavouriteToggle = () => {
    if (isFavourite) {
      removeFavourite(movie.id);
      toast.info("Removed from Favourites 🗑️", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      addFavourite(movie);
      toast.success("Added to Favourites ♡", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div 
      className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative">
          <img
            src={movie.url || "https://via.placeholder.com/500x750?text=No+Image"}
            alt={movie.title}
            className="w-full h-auto rounded-t-lg object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
          
          {/* Play Button */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-extrabold text-white bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-sm mt-1">{movie.release_date}</p>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2">
        <button
          onClick={handleFavouriteToggle}
          className="p-2 bg-gray-800/80 rounded-full focus:outline-none backdrop-blur-sm shadow-md"
        >
          <svg
            className={`w-6 h-6 ${isFavourite ? 'text-red-500' : 'text-white'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;