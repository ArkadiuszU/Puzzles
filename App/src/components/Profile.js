import React , { useState, useEffect, useCallback, useContext  } from 'react';
import { LoginContext } from './Contexts/Contexts';

function Profile({name}) {
    

    return (
                
               <div>
                    Name : {name}
               </div>
    );
  }

export default Profile;