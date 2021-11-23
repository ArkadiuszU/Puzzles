import React , { useState, useEffect, useCallback, useContext  } from 'react';


import NavBox from "./NavBox";

import puzzleIco from "../resources/img/puzzle-ico.png";
import welcomeImg from "../resources/img/hello.svg";

import Profile from "./Profile"
import { LoginContext } from './Contexts/Contexts';

function Welcome() {

    const {loggedUser, setLoggedUser} = useContext(LoginContext);

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
                    

                {
                    (loggedUser == undefined)?
                    
                    <NavBox title="Log in" content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" 
                    buttonText = "Let's join us" navTo ="/enter"/>
                    :
                    <NavBox title="Check your position" content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" 
                    buttonText = "Show ranking" navTo ="/ranking"/>
                }
            </div>
    </div>
    );
  }
export default Welcome;