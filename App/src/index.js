import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import ImagesList from './components/ImagesList';
import Playboard from "./components/Playboard";
import Welcome from "./components/Welcome";
import CreateNew from "./components/CreateNew";
import EnterToApp from "./components/EnterToApp";
import Registration from "./components/Registration";
import Ranking from "./components/Ranking";

import {ImageListContext, LoginContext} from "./components/Contexts/Contexts"

import './resources/scss/index.scss';

function App(props) {

  const [puzzleTasks, setPuzzleTasks] = useState([])
  const [loggedUser, setLoggedUser] = useState({
    country: "sl",
email: "ab@example.com",
gender: "True",
name: "A B",
nick: `${TEST}`,
role: "User"
  })

  //const [loggedUser, setLoggedUser] = useState();

  return (
    <Router>
      <div className="main">
      <Switch>
        <LoginContext.Provider value= {{loggedUser, setLoggedUser}}>
          <Route path="/" exact={true}> 
            <Welcome/>   
          </Route>
          <Route path="/playboard/:id" exact={true}> 
              <Playboard/> 
          </Route>
          <Route path="/imagesList" exact={true}>
            <ImageListContext.Provider value={{puzzleTasks, setPuzzleTasks}}> 
              <ImagesList/>
            </ImageListContext.Provider> 
          </Route>
          <Route path="/create" exact={true}> <CreateNew /> </Route>
          <Route path="/ranking" exact={true}> 

          <ImageListContext.Provider value={{puzzleTasks, setPuzzleTasks}}> 
          <Ranking />
            </ImageListContext.Provider> 
            </Route>

          <Route path="/enter" exact={true}> <EnterToApp/></Route>
          <Route path="/registration" exact={true}> <Registration /> </Route>
          </LoginContext.Provider>
      </Switch>
      </div>
    </Router>
  );
  }

ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));