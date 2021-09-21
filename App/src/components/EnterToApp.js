import React, { useState, useEffect } from 'react';


import Loading from "../components/Loading";

import enterImg from "../resources/img/enter.svg";
import googleLogo from "../resources/img/google.svg";
import fbLogo from "../resources/img/facebook.svg";

function EnterToApp() {

  useEffect(() => {
    console.log("nohej");


  }, [])

  return (
    <div className="entertoapp">
      <img className="entertoapp__imgbox" src={enterImg} ></img>
      <div className="entertoapp__formbox" >
        <h2> login to app</h2>
        <div className="entertoapp__formbox__login">
          <form className="entertoapp__formbox__login__inputs">
            <label htmlFor="email">email: </label>
            <input type="text" id="email" />
            <label htmlFor="password">password: </label>
            <input type="password" id="password" />
          </form>
          <button className="entertoapp__formbox__login__button" >sign in</button>
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
          <p>if you are here first time create an account</p>
          <p>to get to know all the possibilities offered by the app</p>
          <button className="entertoapp__formbox__singup__button" >sign up</button>
        </div>
      </div>
    </div>
  );
}

export default EnterToApp;