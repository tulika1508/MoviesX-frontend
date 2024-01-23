import React,{useState} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { firebaseAuth } from "../utils/firebase.js";
import BackgroundImage from "../components/BackgroundImage.jsx";
import Header from "../components/Header.jsx";
export default function Signup() {
  const [showPassword, setShowPassword] = React.useState({
    currentPassword:{show:false,password:'' 
  }});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handler = async () => {
    //console.log(formValues);
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
    
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  return (
    <Container showpassword={showPassword}>
      <BackgroundImage />
      <div className="content">
      <Header login/>
      <div className="body flex column a-center j-center">
      <div className="text flex column">
        <h1>Browse unlimited movies,TV shows and much more...</h1>
        
        <h6>Want to watch? Sign Up for X-Movies.</h6>
      </div>
      <div className="form">
        <input type="email" placeholder='Email Address' name='email' value={formValues.email}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          })
          
        }/>
        {
          showPassword && <input type="password" placeholder='Password' name='password'
          value={formValues.password}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          })}
        />
        }
        
        {!showPassword && <button onClick={() => setShowPassword(true)}>Let's start</button>}
      </div>
      <button onClick={handler}>Sign Up</button>
      </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
position:relative;
.content{
  position:absolute;
  top:0;
  left:0;
  background-color:rgba(1,0,0,0.7);
  height:100vh;
  width:100vw;
  
  .body{
    gap: 1rem;
      .text {
        margin:40px;
        gap: 1.8rem;
        text-align: center;
        font-size: 1.5rem;
        h1 {
          padding: 0 0rem;
        }
      }
      .form {
        display: grid;
        width: 25%;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        input {
          margin:5px;
          color: black;
          border: none;
          padding: 0.5rem;
          font-size: 0.9rem;
          border: 1px solid black;
          border-radius:10px;
          text-align:left;
        }
        button {
          text-align:center;
          
          margin:auto;
          padding: 0.5rem 1rem;
          background-color: red;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1rem;
          border-radius:10px;
          
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
    
  }
}
`;