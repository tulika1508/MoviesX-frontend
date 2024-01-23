import React from "react";
import styled from "styled-components";
export default function NotAvailable() {
  return (
    <Container>
      <h1>No available movies! </h1>
      <h3>... Please select a different genre ...</h3>
    </Container>
  );
}

const Container=styled.div`
    text-align: center;
    color: red;
    margin-top: 150px;
  h3{
    color:white;
  }
`;