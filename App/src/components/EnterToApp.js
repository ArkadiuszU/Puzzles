import React, { useState, useEffect , useContext} from 'react';
import { useHistory } from 'react-router-dom';
import enterImg from "../resources/img/enter.svg";
import googleLogo from "../resources/img/google.svg";
import fbLogo from "../resources/img/facebook.svg";
import {sayHi} from "../jwt_helper"
import { LoginContext } from './Contexts/Contexts';

function EnterToApp() {

  const history = useHistory();

  const {loggedUser, setLoggedUser} = useContext(LoginContext);

  const [loginForm, setLoginForm] = useState({email: "ab@example.com", password: "123456"});

  const singIn = () =>
  {
    fetch(`${BASEURL}/api/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
            },
        body: JSON.stringify(loginForm),
      })
      .then(response => response.text())
      .then(data => {
        var user = sayHi(data);
        console.log(user);
        setLoggedUser(user)
        history.push("/")
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("serwer nie odpowiada spróbuj za kilka minut")
      });
  } 
  const loginFormChange = (e) => {
    const {name, value} = e.target
    setLoginForm(prev => {return {...prev, [name]: value}})
  }

  return (
    <div className="entertoapp">
      <img className="entertoapp__imgbox" src={enterImg} ></img>
      <div className="entertoapp__formbox" >
        <h2> login to app</h2>
        <div className="entertoapp__formbox__login">
          <form className="entertoapp__formbox__login__inputs">
            <label htmlFor="email">email: </label>
            <input type="text" id="email" name = "email" value= {loginForm.email} onChange={loginFormChange} />
            <label htmlFor="password">password: </label>
            <input type="password" id="password" name = "password" value={loginForm.password} onChange={loginFormChange}  />
          </form>
          <button className="entertoapp__formbox__login__button" onClick={singIn}  >sign in</button>
        </div>
        <div className="entertoapp__formbox__loginexternal">
          <div className="entertoapp__formbox__loginexternal__google">
            <img src={googleLogo} />
            <p>login with google</p>
          </div>
          <div className="entertoapp__formbox__loginexternal__facebook">
            <img src={fbLogo} />
            <p>login with facebook</p>
          </div>
        </div>
        <h2> or </h2>
        <div className="entertoapp__formbox__singup">
        <img className="entertoapp__imgbox" src={enterImg} ></img>
          <div>
          <p>if you are here first time create an account
            to get to know all the possibilities offered by the app</p>
          <button onClick={ () => {history.push("/registration")} } className="entertoapp__formbox__singup__button" >sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterToApp;