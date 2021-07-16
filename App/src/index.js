
import React from 'react';
import ReactDOM from 'react-dom';
import './resources/scss/index.scss';


function App(props) {
    return (
    <>
    <h1 className="test_class" >Hi, {props.name}</h1>
    <div className="row">
      <div className="col-3" style={{backgroundColor:"blue"}}></div>
      <div className="col-8" style={{backgroundColor:"green"}}></div>

    </div>
    </>
    );
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));