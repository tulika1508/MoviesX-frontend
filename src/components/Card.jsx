import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/clip.mp4";
import axios from "axios";

//react.memo-Skipping re-rendering when props are unchanged
//renders only the function if any of its props is changed
export default React.memo(function Card({  movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      console.log("Hi");
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container onMouseLeave={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="video-container">
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="card" onClick={() => navigate("/player")}/>

            <video src={video} autoPlay={true}  onClick={() => navigate("/player")}/>
          </div>
          
          <div className="all-info flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex ">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 200px;
  width: 200px;
  height: 90%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    z-index: -10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 200px;
    position: absolute;
    top: -20vh;
    left: 0;
    border-radius:4px;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: red;
    transition: 0.3s ease-in-out;
    .video-container {
      position: relative;
      height: 130px;
      img {
        width: 100%;
        height: 130px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 130px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .all-info {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 0.5rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: orange;
        }
      }
    }
    .genres {
      ul {
        gap: 0.5rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type:none;
          }
        }
      }
    }
  }
`;