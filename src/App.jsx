import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Movie from "./pages/XMovies.jsx";
import Player from "./pages/Player.jsx";
import Movies from "./pages/Movies.jsx";
import TV_Shows from './pages/TV_Shows.jsx';
//import Fav from './pages/FavMovies.jsx';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/" element={<Movie />} />
      <Route exact path="/player" element={<Player />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/tv" element={<TV_Shows />} />
      
    </Routes>
    </BrowserRouter>
  );
}
