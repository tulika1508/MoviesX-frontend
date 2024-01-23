import React from "react";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";
import { useDispatch } from "react-redux";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select className="flex" onChange={(e) => {
      dispatch(fetchDataByGenre({genres,genre: e.target.value,type,}));}}>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin:auto;
  cursor: pointer;
  font-size: 20px;
  background-color: rgb(240,100,111);
  color: black;
  border-radius:12px;
  
`;