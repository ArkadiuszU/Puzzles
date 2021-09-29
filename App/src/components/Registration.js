import React, { useState, useEffect } from 'react';

import maleAvatarImg from "../resources/img/male_avatar.svg";
import femaleAvatarImg from "../resources/img/female_avatar.svg";

function Registration() {

 
  const [nations, setNations] = useState([]);
  const [typing, setTyping] = useState("typing"); //typing or deleting or disable
  const[formData, setFormData] = useState({"email": "",
                                            "password": "",
                                            "repeatPassword": "",
                                            "name": "",
                                            "lastName": "",
                                            "nickname": null,
                                            "gender": true,
                                            "dateOfBirth": "",
                                            "nation": null,
                                          })

  useEffect(() => {

    fetch('https://flagcdn.com/en/codes.json')
      .then(response => response.json())
      .then(data => { setNations(data) });

  }, [])

  useEffect(() => {
    if(typing==="deleting")
      setTyping("disable")
  }, [formData.nickname])


  const inputChangeHandler = (e)=>
  {
    const {name, value, type} = e.target
    if(type =="radio")
    {
      setFormData(prev => { return  {...prev, [name] : !prev[name] }})
    }
    else{
      setFormData(prev => { return  {...prev, [name] : value }})
    }
  }

  return (
    <div className="registration">
      <div className="registration__profile">
        <img className="registration__profile__avatar" src={(formData.gender) ? maleAvatarImg : femaleAvatarImg} ></img>
        <div className="registration__profile__flag">

          <div className="registration__profile__flag__stat" >

            <div>
              <span>0</span>
              <p> level </p>
              <div>0 points</div>
            </div>


          </div>
          {(formData.nation != null) ? <img className="registration__profile__flag__img" src={`https://flagcdn.com/w160/${formData.nation}.png`} /> : <div className="registration__profile__flag__img--without-a-flag" ></div>}
        </div>
        <div className="registration__profile__nickname">

          <h2 className={`nickname-${typing}`} >{(formData.nickname == null) ?"your nickname":formData.nickname}</h2>

        </div>


      </div>
      <div className="registration__formbox">
        <form className="registration__formbox__singup-inputs">

          <label htmlFor="email">email: </label>
          <input type="text" id="email" value = {formData.email} name="email" onChange={inputChangeHandler}  />

          <label htmlFor="password">password: </label>
          <input type="password" id="password" value = {formData.password} name="password" onChange={inputChangeHandler} />

          <label htmlFor="repeat-password">repeat-password: </label>
          <input type="password" id="repeat-password" value = {formData.repeatPassword} name="repeatPassword"  onChange={inputChangeHandler} />

          <label htmlFor="name">name: </label>
          <input type="text" id="name" value = {formData.name} name="name" onChange={inputChangeHandler} />

          <label htmlFor="lastname">last name: </label>
          <input type="text" id="lastname"  value = {formData.lastName} name="lastName"  onChange={inputChangeHandler}/>

          <label htmlFor="nickname"> nickname: </label>
          <input
            onChange={(e) => {
              inputChangeHandler(e); 
            }}
            onFocus={() => {
              if(typing === "typing")
              setTyping("deleting")}}
            type="text"
            id="nickname"
            value= {formData.nickname}
            name="nickname"
          />



          <div className="registration__formbox__singup-inputs__boxes" >
            <div className="registration__formbox__singup-inputs__boxes__gender-box" >
              <label htmlFor="gender">gender: </label>
              <div className="registration__formbox__singup-inputs__boxes__gender-box__box">
                <label className="registration__formbox__singup-inputs__boxes__gender-box__box__radio" >
                  <input type="radio" id = "genderM" name="gender" checked={formData.gender} onChange={inputChangeHandler} />
                  <span>  <div className={(formData.gender) ? "registration__formbox__singup-inputs__boxes__gender-box__box__radio--selected" : ""} > </div> </span>
                  M
                </label>
                <label className="registration__formbox__singup-inputs__boxes__gender-box__box__radio" >
                  <input type="radio" id="genderF" name="gender" checked={!formData.gender}  onChange={inputChangeHandler} />
                  <span> <div className={(!formData.gender) ? "registration__formbox__singup-inputs__boxes__gender-box__box__radio--selected" : ""} > </div></span>
                  F
                </label>
              </div>
            </div>

            <div className="registration__formbox__singup-inputs__boxes__date-box">
              <label htmlFor="date">date of birth: </label>
              <input type="date"  value= {formData.dateOfBirth} name="dateOfBirth" onChange={inputChangeHandler} />
            </div>

          </div>




          <label htmlFor="nation">nation: </label>
          <select id="nation" name="nation" value={formData.nation} onChange={inputChangeHandler} >
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