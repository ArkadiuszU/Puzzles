import React, { useState, useEffect } from 'react';

import maleAvatarImg from "../resources/img/male_avatar.svg";
import femaleAvatarImg from "../resources/img/female_avatar.svg";

function Registration() {

    const[sex, setSex] = useState(true);
    const[nations, setNations] = useState([]);
    const[selectedNations, setSelectedNations] = useState();


  useEffect(() => {
    
    fetch('https://flagcdn.com/en/codes.json')
    .then(response => response.json())
    .then(data => { console.log(data); setNations(data) });

  }, [])

  useEffect(() => {
    
console.log(selectedNations)

  }, [selectedNations])

  return (
    <div className="entertoapp">
        <div>
        {(selectedNations != null )?<img className="entertoapp__imgbox" src={`https://flagcdn.com/w160/${selectedNations}.png`}/>: null}
            <img className="entertoapp__imgbox" src={ (sex)? maleAvatarImg : femaleAvatarImg} ></img>
        </div>
        <div>
        <form className="entertoapp__formbox__login__inputs">

            <label htmlFor="email">email: </label>
            <input type="text" id="email" />

            <label htmlFor="password">password: </label>
            <input type="password" id="password" />

            <label htmlFor="repeat-password">repeat-password: </label>
            <input type="password" id="repeat-password" />

            <label htmlFor="name">Name: </label>
            <input type="text" id="name" />

            <label htmlFor="lastname">Last name: </label>
            <input type="text" id="lastname" />

            <label htmlFor="sex">Sex: </label>
            <input type="checkbox" id="sex"  checked={sex} onChange= {() => { setSex(prev => !prev) } }  />

            <label htmlFor="nation">Nation: </label>
            <select id = "nation"  onChange={(e)=> setSelectedNations(e.target.value) } >
                {
                    Object.keys(nations).map( key => 
                        {
                         return <option key={key} value={key}>{nations[key]}</option>
                        }
                    )
                }
                
            </select>


          </form>
          <button className="entertoapp__formbox__singup__button" >sign up</button>
        </div>
    </div>
  );
}

export default Registration;