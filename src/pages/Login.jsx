import React,{useState} from 'react'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { firebaseAuth } from "../utils/firebase.js";
import BackgroundImage from "../components/BackgroundImage.jsx";
import Header from "../components/Header.jsx";
export default function Login() {
  
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlerLog = async () => {
    //console.log(formValues);
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
    
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  return (
    <Container >
      <BackgroundImage/>
      <div className="content">
        <Header/>
        <div className="title flex a-centre j-center">
              <h2>Login to X-Movies</h2>
            </div>
        <div className="form-container flex a-center j-center">
        <div className="form flex a-center j-center">
        
          <div className="container flex column">
          <input type="email" placeholder='Email Address' name='email' value={formValues.email}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          })
          
        }/>
        <input type="password" placeholder='Password' name='password'
          value={formValues.password}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          })}
        />
        
        <button onClick={handlerLog}>Let's start</button>
          </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
position:relative;
width:80%;
.content{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  
  background-color:rgba(1,0,0,0.7);
  height:100vh;
  width:100vw;
  .title{
    margin:30px;
  }
  .form {
        width:80%;
        margin:30px;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        input {
          margin:10px;
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
            
            margin:30px;
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