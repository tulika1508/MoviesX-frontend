import React,{useEffect,useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import styled from 'styled-components';
import BackgroundImage from '../assets/back.jpg';
import MovieLogo from '../assets/rambo-logo.png';
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store/index.js";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.js";
import Slider from "../components/Slider";

export default function XMovies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.xmovies.movies);
  const genres = useSelector((state) => state.xmovies.genres);
  const genresLoaded = useSelector((state) => state.xmovies.genresLoaded);
  //here we have used an even listener that when the length is more than 0,
  //then background is changed to black as isScrolled prop is transfered

  useEffect(() => {
    dispatch(getGenres());
  },[]);
  
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  },[genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
 //console.log(movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="welcome">Welcome to X-Movies</div>
      <div className="main">
        <img src={BackgroundImage} alt="background"  className='background'/>
      
      <div className="main-display">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="button flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center">
              <FaPlay />
              Play
            </button>
            <button className="flex a-center j-center ">
              <AiOutlineInfoCircle />
              More Information
            </button>
          </div>
      </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  );
}

const Container=styled.div`
background-color: black;
.welcome{
  text-align:center;
}
  .main {
    position: relative;
    .background{
      filter: brightness(80%);
    }
    img {
      opacity:80%;
      height: 100vh;
      width: 100vw;
    }
    .main-display {
      position: absolute;
      bottom: 5rem;     
        img {
          opacity:80%;
          width: 100%;
          height: 100%;
          margin-left: 70px;
          border-radius:50px;
        }
      
      .button {
        margin: 70px;
        gap: 15px;
        button {
          background-color:rgb(225,222,222);
          font-size: 18px;
          gap: 15px;
          border-radius: 15px;
          padding: 0.5rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            color:red;
            opacity: 0.7;
          }
          &:nth-of-type(2) {
            background-color: rgb(225,222,222);
            
            color: black;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
