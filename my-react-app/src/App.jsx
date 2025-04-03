// src/App.jsx
import React from "react";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Favourites from "./Pages/Favourites/Favourites";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import Navbar from "./Components/Navbar/Navbar";
import { FavouritesProvider } from "./Context/FavouritesContext"; // Updated import
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";

const App = () => {
  return (
    <FavouritesProvider>
      <main className="main-content">
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login/>}  />
          <Route path="/profile" element ={<Profile/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
       

        </Routes>
      </main>
    </FavouritesProvider>
  );
};

export default App;