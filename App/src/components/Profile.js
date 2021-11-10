import React , { useState, useEffect, useCallback, useContext  } from 'react';
import { LoginContext } from './Contexts/Contexts';
import maleAvatarImg from "../resources/img/male_avatar.svg";
import femaleAvatarImg from "../resources/img/female_avatar.svg";
import {Link} from 'react-router-dom';

function Profile() {
  
  const {loggedUser, setLoggedUser} = useContext(LoginContext)
  const [showedDetails, setShowedDetails] = useState(false)
 

  if( loggedUser != undefined)
  {
    return(      <>

               <div className = {(!showedDetails)?"profile profile--close":"profile profile--open" }   onClick={()=> setShowedDetails(prev => {return  ! prev})} >
                    <p>{loggedUser.nick}</p>
                    <img className="profile__avatar" src={(loggedUser.gender) ? maleAvatarImg : femaleAvatarImg} ></img>

{
                  (showedDetails)?
                    <div className = "profile-details"> 
                    <img className="profile-details__avatar" src={(loggedUser.gender) ? maleAvatarImg : femaleAvatarImg} ></img>
                      <p>{loggedUser.name}</p>
                      <p>{loggedUser.email}</p>

                      <Link className= "profile-details__link" to="/"> Show profile details </Link>
                    
                      <a href="" onClick = {()=>setLoggedUser()} className= "profile-details__link" > Log out </a>
                    </div>

                    :
                    null
  }
               </div>

               </>

               
    );
  }
  else
  {
    return null;
  }
}

export default Profile;