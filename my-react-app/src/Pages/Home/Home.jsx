import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../Components/Card/MovieCard";
import {
  getPopularMovies,
  getMoviesByGenre,
  getTopRatedMovies,
  getTrendingMovies,
  getSearchMovies,
} from "../../Services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentBackdrop, setCurrentBackdrop] = useState(0);
  const [categories, setCategories] = useState({
    popular: [],
    topRated: [],
    trending: [],
    horror: [],
    sciFi: [],
    action: [],
    drama: [],
    romance: [],
    crime: [],
  });

  useEffect(() => {
    fetchAllCategories();
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    if (trendingMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentBackdrop((prev) => (prev + 1) % trendingMovies.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [trendingMovies]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults();
      } else {
        setMovies([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const [
        popular,
        topRated,
        trending,
        horror,
        sciFi,
        action,
        drama,
        romance,
        crime,
      ] = await Promise.all([
        getPopularMovies(),
        getTopRatedMovies(),
        getTrendingMovies(),
        getMoviesByGenre(27),
        getMoviesByGenre(878),
        getMoviesByGenre(28),
        getMoviesByGenre(18),
        getMoviesByGenre(10749),
        getMoviesByGenre(80),
      ]);

      setCategories({
        popular,
        topRated,
        trending,
        horror,
        sciFi,
        action,
        drama,
        romance,
        crime,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const searchResults = await getSearchMovies(searchQuery);
      setMovies(searchResults);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback image for backdrop
  const fallbackBackdrop = "https://via.placeholder.com/1920x1080.png?text=No+Backdrop+Available";

  const getBackdropUrl = () => {
    const movie = trendingMovies[currentBackdrop];
    if (movie?.backdrop_path) {
      return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    } else if (movie?.poster_path) {
      return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    }
    return fallbackBackdrop;
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {trendingMovies.length > 0 && (
        <div className="relative w-full">
          {/* Backdrop Image */}
          <div 
            className="relative w-full h-[50vh] md:h-[70vh] bg-center bg-no-repeat transition-all duration-1000 ease-in-out overflow-hidden"
          >
            <img
              src={getBackdropUrl()}
              alt={trendingMovies[currentBackdrop]?.title || "Movie Backdrop"}
              className="w-full h-full object-contain md:object-cover md:object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-center items-start text-left p-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-xl bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {trendingMovies[currentBackdrop]?.title || "Movie Title"}
              </h1>
              <p className="text-sm md:text-lg max-w-xl md:max-w-2xl mb-6 line-clamp-3">
                {trendingMovies[currentBackdrop]?.overview || "No description available."}
              </p>
              <div className="flex gap-4 mt-4">
                <button className="bg-red-600 text-white px-6 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-red-700 transition duration-300">
                  ▶ Play
                </button>
                <Link
                  to={`/movie/${trendingMovies[currentBackdrop]?.id}`}
                  className="bg-gray-700 text-white px-6 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-600 transition duration-300"
                >
                  ℹ More Info
                </Link>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex justify-center p-4">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-md bg-gray-800 text-white focus:outline-none w-32 sm:w-48 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-xl">Loading...</p>
        </div>
      )}

      {/* Search Results */}
      {movies.length > 0 && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  id: movie.id,
                  title: movie.title,
                  release_date: movie.release_date,
                  url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  poster_path: movie.poster_path,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Movies by Category */}
      {Object.entries(categories).map(([category, movies]) => (
        <div key={category} className="p-4">
          <h2 className="text-2xl font-bold capitalize mb-4">
            {category.replace(/([A-Z])/g, " $1")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  id: movie.id,
                  title: movie.title,
                  release_date: movie.release_date,
                  url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  poster_path: movie.poster_path,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;