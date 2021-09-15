import React , { useState, useEffect  } from 'react';

import Loading from "../components/Loading";

function CreateNew() {
  
    useEffect(()=>{
      console.log("nohej");
  
  
    }, [])
  
      return (
        <div className= "CreateNew">
        <h2>CreateNew...</h2>

        <Loading/>
        </div>
      );
    }
  
  export default CreateNew;