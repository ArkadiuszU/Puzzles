import React, { useState, useEffect } from 'react';

import maleAvatarImg from "../resources/img/male_avatar.svg";
import femaleAvatarImg from "../resources/img/female_avatar.svg";

function Registration() {

  const [sex, setSex] = useState(true);
  const [nations, setNations] = useState([]);
  const [selectedNations, setSelectedNations] = useState(null);

  const [typing, setTyping] = useState(false);
  const [nickname, setNickname] = useState("your nickname");

  useEffect(() => {

    fetch('https://flagcdn.com/en/codes.json')
      .then(response => response.json())
      .then(data => { console.log(data); setNations(data) });

  }, [])

  useEffect(() => {

    console.log(selectedNations)

  }, [selectedNations])

  return (
    <div className="registration">
      <div className="registration__profile">
        <img className="registration__profile__avatar" src={(sex) ? maleAvatarImg : femaleAvatarImg} ></img>
        <div className="registration__profile__flag">
          {(selectedNations != null) ? <img className="registration__profile__flag__img" src={`https://flagcdn.com/w160/${selectedNations}.png`} /> : <div className="registration__profile__flag__img--without-a-flag" ></div>}
        </div>
        <div className="registration__profile__nickname">

          <h2 data-foo={nickname.length} className= {(typing)?"nickname-deleting":"nickname-typing"}>{nickname}</h2>
    
        </div>


      </div>
      <div className="registration__formbox">
        <form className="registration__formbox__singup-inputs">

          <label htmlFor="email">email: </label>
          <input type="text" id="email" />

          <label htmlFor="password">password: </label>
          <input type="password" id="password" />

          <label htmlFor="repeat-password">repeat-password: </label>
          <input type="password" id="repeat-password" />

          <label htmlFor="name">name: </label>
          <input type="text" id="name" />

          <label htmlFor="lastname">last name: </label>
          <input type="text" id="lastname" />

          <label htmlFor="nickname">nickname: </label>
          <input onBlur = {(e) => {setTyping(false); setNickname(e.target.value)  } } onFocus = {() => setTyping(true)} type="text" id="nickname" />

          <label htmlFor="sex">sex: </label>
          <input type="checkbox" id="sex" checked={sex} onChange={() => { setSex(prev => !prev) }} />

          <label htmlFor="nation">Nation: </label>
          <select id="nation" onChange={(e) => setSelectedNations(e.target.value)} >
            <option value="" selected disabled hidden>Choose here</option>
            {
              Object.keys(nations).map(key => {
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