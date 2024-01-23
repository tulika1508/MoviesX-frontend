import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Clip from "../assets/clip.mp4";
import { BsArrowLeft } from "react-icons/bs";

export default function Player() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="back-to-home">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={Clip} autoPlay  controls />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back-to-home {
      position: absolute;
      padding: 20px;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .back-to-home:hover{
      color:gray;
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
