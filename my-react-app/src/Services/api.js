const API_KEY = "c64beaba7f8b507ddeabffec5fa02709";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch popular movies
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch movies by genre
export const getMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
};

// Fetch top-rated movies
export const getTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch trending movies (daily or weekly)
export const getTrendingMovies = async (timeWindow = "day") => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Fetch movie details by ID
export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Fetch search results
export const getSearchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};