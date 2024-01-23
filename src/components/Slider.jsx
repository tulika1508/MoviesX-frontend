import React from "react";
import styled from "styled-components";
import CardSlider from "./SliderCard";
export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 10)} title="New Releases" />
      <CardSlider data={getMoviesFromRange(10, 20)} title="Trending movies" />
      <CardSlider data={getMoviesFromRange(20, 30)} title="Adventure Movies"
      />
      <CardSlider data={getMoviesFromRange(30, 40)}  title="Action Movies"
      />
      <CardSlider data={getMoviesFromRange(40, 50)} title="Romantic Movies" />
      <CardSlider data={getMoviesFromRange(50, 60)} title="Cartoon Movies" />
      <CardSlider data={getMoviesFromRange(60, 70)} title="Blockbuster Movies" />
      <CardSlider data={getMoviesFromRange(70, 80)} title="Late 90's" />
    </Container>
  );
}

const Container = styled.div``;