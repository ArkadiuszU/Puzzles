import React, { useState, useEffect } from 'react';

import maleAvatarImg from "../resources/img/male_avatar.svg";
import femaleAvatarImg from "../resources/img/female_avatar.svg";

function Registration() {

  const [sex, setSex] = useState(true);
  const [nations, setNations] = useState([]);
  const [selectedNations, setSelectedNations] = useState(null);

  const [typing, setTyping] = useState({ value: false, firstTime: true });
  const [nickname, setNickname] = useState("your nickname");

  useEffect(() => {

    fetch('https://flagcdn.com/en/codes.json')
      .then(response => response.json())
      .then(data => { setNations(data) });

  }, [])

  // useEffect(() => {


  //   console.log(typing)

  // }, [typing])

  return (
    <div className="registration">
      <div className="registration__profile">
        <img className="registration__profile__avatar" src={(sex) ? maleAvatarImg : femaleAvatarImg} ></img>
        <div className="registration__profile__flag">
          {(selectedNations != null) ? <img className="registration__profile__flag__img" src={`https://flagcdn.com/w160/${selectedNations}.png`} /> : <div className="registration__profile__flag__img--without-a-flag" ></div>}
        </div>
        <div className="registration__profile__nickname">

          <h2 className={(typing.firstTime) ? (typing.value) ? "nickname-deleting" : "nickname-typing" : "nickname-disable"} >{nickname}</h2>

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
          <input
            onChange={(e) => {
              setNickname(e.target.value);
              if (typing.firstTime === true)
                setTyping(prev => { return { ...prev, firstTime: false } })
            }}
            onFocus={() =>
              setTyping(prev => { return { ...prev, value: true } })}
            type="text"
            id="nickname"
          />


          <label htmlFor="gender">gender: </label>
          <div className="registration__formbox__singup-inputs__gender">
            <label className="registration__formbox__singup-inputs__gender__radio" >
              <input type="radio" name="gender" checked={sex} onChange={() => { setSex(prev => !prev) }} />
              <span></span>
           M
          </label>

            <label className="registration__formbox__singup-inputs__gender__radio" >
              <input onChange={()=> console.log("change")} type="radio" name="gender" checked={sex} onChange={() => { setSex(prev => !prev) }} />
              <span></span>
           F
          </label>
          </div>



          <label htmlFor="nation">nation: </label>
          <select id="nation" onChange={(e) => setSelectedNations(e.target.value)} >
            <option defaultValue="" hidden >Choose here</option>
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