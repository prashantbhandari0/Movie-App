import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getTrendingMovies } from "../../Services/api";
import { FavouritesContext } from "../../Context/FavouritesContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);
  const [movie, setMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieDetails, trending] = await Promise.all([
          getMovieDetails(id),
          getTrendingMovies(),
        ]);
        setMovie(movieDetails);
        setTrendingMovies(trending.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isFavourite = favourites.some((fav) => fav.id === movie?.id);

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

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white text-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white text-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Movie not found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Movie Poster with Play Button */}
          <div
            className="relative w-full md:w-1/3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
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
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              {movie.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">{movie.overview}</p>
            <div className="space-y-3">
              <p className="text-gray-400 text-lg">
                <strong className="text-white">Release Date:</strong> {movie.release_date}
              </p>
              <p className="text-gray-400 text-lg">
                <strong className="text-white">Rating:</strong>
                <span className="ml-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
                  {movie.vote_average}/10
                </span>
              </p>
              <p className="text-gray-400 text-lg">
                <strong className="text-white">Genres:</strong>{" "}
                {movie.genres?.map((g) => g.name).join(", ")}
              </p>
            </div>

            {/* Add/Remove from Favorites Button */}
            <button
              onClick={handleFavouriteToggle}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
              {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      {trendingMovies.length > 0 && (
        <div className="max-w-5xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Trending Movies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingMovies.map((trendingMovie) => (
              <div
                key={trendingMovie.id}
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <Link to={`/movie/${trendingMovie.id}`} className="block">
                  <div className="relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}`}
                      alt={trendingMovie.title}
                      className="w-full h-auto rounded-t-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
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
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h3 className="text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                        {trendingMovie.title}
                      </h3>
                      <p className="text-gray-300 text-xs">{trendingMovie.release_date}</p>
                    </div>
                  </div>
                </Link>
                {/* Favorite Button */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      const isFav = favourites.some((fav) => fav.id === trendingMovie.id);
                      if (isFav) {
                        removeFavourite(trendingMovie.id);
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
                        addFavourite(trendingMovie);
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
                    }}
                    className="p-2 bg-gray-800/80 rounded-full focus:outline-none backdrop-blur-sm shadow-md"
                  >
                    <svg
                      className={`w-6 h-6 ${favourites.some((fav) => fav.id === trendingMovie.id) ? "text-red-500" : "text-white"}`}
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
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;