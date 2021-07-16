
import React from 'react';
import ReactDOM from 'react-dom';

import SinglePuzzlePiece from "./components/SinglePuzzlePiece";

import './resources/scss/index.scss';


function App(props) {
    return (
    <div className= "playboard">
      <SinglePuzzlePiece color = "red"/>
      <SinglePuzzlePiece color = "green"/>
    </div>
    );
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));