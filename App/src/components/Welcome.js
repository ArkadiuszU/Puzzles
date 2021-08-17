import React from 'react';

import NavBox from "./NavBox";

import puzzleIco from "../resources/img/puzzle-ico.png";
import welcomeImg from "../resources/img/hello.svg";

console.log(puzzleIco);

function Welcome() {
    return (
        <div className= "welcome"  >
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
                    buttonText = "Let's make it" navTo ="/playboard"/>
               <NavBox title="Log in" content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" 
                    buttonText = "Let's join us" navTo ="/playboard"/>
            </div>
    </div>
    );
  }
export default Welcome;