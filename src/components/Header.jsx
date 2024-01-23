import React from 'react'
import  {useNavigate}  from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.png";


export default function Header(props) {
  const navigate= useNavigate();
  
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
      <img src={logo} alt="logo" />
      </div>
      <button onClick={()=> navigate(props.login?"/login":"/signup")}>
        {props.login? "Log In":"Sign Up"}
      </button>
    </Container>
  );
}

const Container =styled.div`
padding:0px 20px;
.logo{
img{
  height:4rem;
  border-radius:60px;
  border:1px solid gray;
  margin:20px;
}
}
button {
  
  padding: 0.8rem 1rem;
  background-color: red;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 0.3rem;
  font-weight: bolder;
  font-size: 1.00rem;
}
`;