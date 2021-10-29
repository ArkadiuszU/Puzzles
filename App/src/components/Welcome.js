import React , { useState, useEffect, useCallback, useContext  } from 'react';
import { LoginContext } from './Contexts/Contexts';

import NavBox from "./NavBox";

import puzzleIco from "../resources/img/puzzle-ico.png";
import welcomeImg from "../resources/img/hello.svg";

import Profile from "./Profile"

function Welcome() {
    const {loginData, setLoginData} = useContext(LoginContext);
    return (
        
        <div className= "welcome"  >
            <Profile/>
            <div className="welcome__header">
                <div className="welcome__header__text">
                    <h1>Hello !</h1>
                    <h2>Welcome to Puzzle</h2>
                    <p> run game and try yourself  <img className="welcome__header__text__icon" src= {puzzleIco} />  </p>
                </div>
                <img className="welcome__header__undraw" src= {welcomeImg}  /> 
            </div>
            <div className="welcome__navbox">
               <NavBox title="Play" content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" 
                    buttonText = "Let's play" navTo ="/imagesList"/>
               <NavBox title="Make puzzle" content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" 
                    buttonText = "Let's make it" navTo ="/create"/>
               <NavBox title="Log in" content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" 
                    buttonText = "Let's join us" navTo ="/enter"/>
            </div>
    </div>
    );
  }
export default Welcome;