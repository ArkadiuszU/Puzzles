import React , { useState, useEffect  } from 'react';


import Loading from "../components/Loading";

import enterImg from "../resources/img/enter.svg"; 

function EnterToApp() {
  
    useEffect(()=>{
      console.log("nohej");
  
  
    }, [])
  
      return (
        <div className= "EnterToApp">
       <img src={enterImg} ></img>
        </div>
      );
    }
  
  export default EnterToApp;