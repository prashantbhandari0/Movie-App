// // src/Pages/Favourites/Favourites.jsx
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { FavoritesContext } from '../../Context/FavouritesContext'
// import MovieCard from "../../Components/Card/MovieCard";

// const Favourites = () => {
//   const { favorites } = useContext(FavoritesContext);

//   return (
//     <div className="min-h-screen bg-black text-white p-4">
//       <h2 className="text-3xl font-bold mb-4 text-center">Your Favourites</h2>
//       {favorites.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-[80vh]">
//           <p className="text-lg text-gray-400 mb-6">
//             There's nothing added to your favourites.
//           </p>
//           <Link
//             to="/"
//             className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
//           >
//             Add Favourites
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {favorites.map((movie) => (
//             <MovieCard
//               key={movie.id}
//               movie={{
//                 id: movie.id,
//                 title: movie.title,
//                 release_date: movie.release_date,
//                 url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favourites;

// src/Pages/Favourites/Favourites.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../../Context/FavouritesContext"; // Updated import
import MovieCard from "../../Components/Card/MovieCard";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext); // Updated variable name

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Favourites</h2>
      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <p className="text-lg text-gray-400 mb-6">
            There's nothing added to your favourites.
          </p>
          <Link
            to="/"
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            Add Favourites
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;