import React , { useState, useEffect, useCallback, useContext  } from 'react';
import { LoginContext } from './Contexts/Contexts';

function Profile() {
  
  const {loginData, setLoginData} = useContext(LoginContext);

  if(loginData.token != "")
  {
    return(      
               <div className="profil" >
                    Hello {loginData.name}
               </div>
    );
  }
  else
  {
    return null;
  }
}

export default Profile;