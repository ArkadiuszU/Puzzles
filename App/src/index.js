
import React from 'react';
import ReactDOM from 'react-dom';

import SinglePuzzlePiece from "./components/SinglePuzzlePiece";

import './resources/scss/index.scss';


function App(props) {
    return (
    <div className= "playboard">
      <SinglePuzzlePiece color = "red" startTop = {20} startLeft= {20}/>
      <SinglePuzzlePiece color = "green" startTop = {20} startLeft= {20}/>
    </div>
    );
  }

ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));