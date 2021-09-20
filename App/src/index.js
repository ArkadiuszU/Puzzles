
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import ImagesList from './components/ImagesList';
import Playboard from "./components/Playboard";
import Welcome from "./components/Welcome";
import CreateNew from "./components/CreateNew";
import EnterToApp from "./components/EnterToApp";

import './resources/scss/index.scss';

function App(props) {
  return (
    <Router>
       <div className="main">
      <Switch>
       
          <Route path="/" exact={true}> <Welcome/> </Route>
          <Route path="/playboard/:id" exact={true}> <Playboard /> </Route>
          <Route path="/imagesList" exact={true}> <ImagesList /> </Route>
          <Route path="/create" exact={true}> <CreateNew /> </Route>
          <Route path="/enter" exact={true}> <EnterToApp /> </Route>
      </Switch>
      </div>
    </Router>
  );
  }

ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));