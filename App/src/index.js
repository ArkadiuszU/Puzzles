import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import ImagesList from './components/ImagesList';
import Playboard from "./components/Playboard";
import Welcome from "./components/Welcome";
import CreateNew from "./components/CreateNew";
import EnterToApp from "./components/EnterToApp";
import Registration from "./components/Registration";

import {ImageListContext, LoginContext} from "./components/Contexts/Contexts"

import './resources/scss/index.scss';

function App(props) {

  const [puzzleTasks, setPuzzleTasks] = useState([])
  const [loginData, setLoginData] = useState({name:"name", token:""})

  return (
    <Router>
       <div className="main">
      <Switch>
       
          <Route path="/" exact={true}> 
            <LoginContext.Provider value= {{loginData, setLoginData}}>
              <Welcome/> 
            </LoginContext.Provider>
          </Route>
          <Route path="/playboard/:id" exact={true}> <Playboard /> </Route>
          <Route path="/imagesList" exact={true}> <ImageListContext.Provider value={{puzzleTasks, setPuzzleTasks}}><ImagesList /></ImageListContext.Provider> </Route>
          <Route path="/create" exact={true}> <CreateNew /> </Route>
          <Route path="/enter" exact={true}>  
            <LoginContext.Provider value= {{loginData, setLoginData}}>
              <EnterToApp/>
            </LoginContext.Provider>
          </Route>
          <Route path="/registration" exact={true}> <Registration /> </Route>
      </Switch>
      </div>
    </Router>
  );
  }

ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));