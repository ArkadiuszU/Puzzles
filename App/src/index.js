
import React from 'react';
import ReactDOM from 'react-dom';

import Playboard from "./components/Playboard";

import './resources/scss/index.scss';


function App(props) {
    return (
    <div >
      <Playboard />
    </div>
    );
  }

ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));