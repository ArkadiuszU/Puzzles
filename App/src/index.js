
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import Playboard from "./components/Playboard";
import Welcome from "./components/Welcome";



import './resources/scss/index.scss';


function App(props) {
  return (
    <Router>
       <div className="main">
      <Switch>
       
          <Route path="/" exact={true}> <Welcome/> </Route>
          <Route path="/playboard" exact={true}> <Playboard /> </Route>
      
      </Switch>
      </div>
    </Router>
  );
  }

ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));