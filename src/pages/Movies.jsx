import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/SliderCard";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store/index.js";
import SelectGenre from "../components/SelectGenre.jsx";
import Slider from "../components/Slider.jsx";
import NotAvailable from "../components/NotAvailable.jsx";

export default function Movies() {
    
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.xmovies.movies);
  const genres = useSelector((state) => state.xmovies.genres);
  const genresLoaded = useSelector((state) => state.xmovies.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movies" }));
    }
  }, [genresLoaded]);

  const [ user,setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <CardSlider data={getMoviesFromRange(0, 50)} title="All movies" /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 150px;
  }
`;
