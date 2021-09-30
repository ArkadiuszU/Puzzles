import React, { useState, useEffect } from 'react';

import maleAvatarImg from "../resources/img/male_avatar.svg";
import femaleAvatarImg from "../resources/img/female_avatar.svg";

function Registration() {


  const [nations, setNations] = useState([]);
  const [typing, setTyping] = useState("typing"); //typing or deleting or disable
  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
    "repeatPassword": "",
    "name": "",
    "lastName": "",
    "nickname": undefined,
    "gender": true,
    "dateOfBirth": "",
    "nation": "",
  })
  const [formValidation, setFormValidation] = useState({
    "email": undefined,
    "password": undefined,
    "repeatPassword": undefined,
    "nickname": undefined,
    "dateOfBirth": undefined,
    "nation": undefined,
  })

  useEffect(() => {

    fetch('https://flagcdn.com/en/codes.json')
      .then(response => response.json())
      .then(data => { setNations(data) });

  }, [])

  useEffect(() => {
    if (typing === "deleting")
      setTyping("disable")
  }, [formData.nickname])


  const inputChangeHandler = (e) => {
    const { name, value, type } = e.target
    if (type == "radio") {
      setFormData(prev => { return { ...prev, [name]: !prev[name] } })
    }
    else {
      setFormData(prev => { return { ...prev, [name]: value } })
    }
  }

  const inputValidation = () => {
    console.log("start validation")
    Object.keys(formValidation).forEach(el => {
      console.log(el)
      if (formData[el] === "" || formData[el] === undefined) {
        console.log("is empty")
        setFormValidation(prev => { return { ...prev, [el]: "empty" } })
      }
      else {

        if (el === "email") {
          if (!validateEmail(formData.email)) {
            setFormValidation(prev => { return { ...prev, email: "email" } })
          }
          else {
            setFormValidation(prev => { return { ...prev, email: undefined } })
          }
        }

        else if (el === "password") {
          if (formData.password.length < 6) {
            setFormValidation(prev => { return { ...prev, password: "password" } })
          }
          else {
            setFormValidation(prev => { return { ...prev, password: undefined } })
            
          }
        }

        else if (el === "repeatPassword") {
          if (formData.password.length < 6) {
            setFormValidation(prev => { return { ...prev, repeatPassword: "re-password" } })
          }
          else {
            if(formData.repeatPassword != formData.password)
            {
              setFormValidation(prev => { return { ...prev, repeatPassword: "re-password" } })
            }
            else{
              setFormValidation(prev => { return { ...prev, repeatPassword: undefined } })
            }
          }
        }
        else{
          setFormValidation(prev => { return { ...prev, [el]: undefined } })
        }




      }
    })
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
          {(formData.nation != "") ? <img className="registration__profile__flag__img" src={`https://flagcdn.com/w160/${formData.nation}.png`} /> : <div className="registration__profile__flag__img--without-a-flag" ></div>}
        </div>
        <div className="registration__profile__nickname">

          <h2 className={`nickname-${typing}`} >{(formData.nickname == null) ? "your nickname" : formData.nickname}</h2>

        </div>


      </div>
      <div className="registration__formbox">
        <form className="registration__formbox__singup-inputs">

          <label htmlFor="email" className={formValidation.email ? `input-validation-fault--${formValidation.email}` : ""} >email: </label>
          <input type="text" id="email" value={formData.email} name="email" onChange={inputChangeHandler} />

          <label htmlFor="password" className={formValidation.password ? `input-validation-fault--${formValidation.password}` : ""} >password: </label>
          <input type="password" id="password" value={formData.password} name="password" onChange={inputChangeHandler} className={formValidation.password ? "input-validation-fault" : ""} />

          <label htmlFor="repeat-password" className={formValidation.repeatPassword ? `input-validation-fault--${formValidation.repeatPassword}` : ""}>repeat-password: </label>
          <input type="password" id="repeat-password" value={formData.repeatPassword} name="repeatPassword" onChange={inputChangeHandler} className={formValidation.password ? "input-validation-fault" : ""} />

          <label htmlFor="name">name: </label>
          <input type="text" id="name" value={formData.name} name="name" onChange={inputChangeHandler} />

          <label htmlFor="lastname">last name: </label>
          <input type="text" id="lastname" value={formData.lastName} name="lastName" onChange={inputChangeHandler} />

          <label htmlFor="nickname" className={formValidation.nickname ? `input-validation-fault--${formValidation.nickname}` : ""}> nickname: </label>
          <input
            onChange={(e) => {
              inputChangeHandler(e);
            }}
            onFocus={() => {
              if (typing === "typing")
                setTyping("deleting")
            }}
            type="text"
            id="nickname"
            value={formData.nickname}
            name="nickname"
          />

          <div className="registration__formbox__singup-inputs__boxes" >
            <div className="registration__formbox__singup-inputs__boxes__gender-box" >
              <label htmlFor="gender">gender: </label>
              <div className="registration__formbox__singup-inputs__boxes__gender-box__box">
                <label className="registration__formbox__singup-inputs__boxes__gender-box__box__radio" >
                  <input type="radio" id="genderM" name="gender" checked={formData.gender} onChange={inputChangeHandler} />
                  <span>  <div className={(formData.gender) ? "registration__formbox__singup-inputs__boxes__gender-box__box__radio--selected" : ""} > </div> </span>
                  M
                </label>
                <label className="registration__formbox__singup-inputs__boxes__gender-box__box__radio" >
                  <input type="radio" id="genderF" name="gender" checked={!formData.gender} onChange={inputChangeHandler} />
                  <span> <div className={(!formData.gender) ? "registration__formbox__singup-inputs__boxes__gender-box__box__radio--selected" : ""} > </div></span>
                  F
                </label>
              </div>
            </div>

            <div className="registration__formbox__singup-inputs__boxes__date-box">
              <label className={formValidation.dateOfBirth ? `input-validation-fault--${formValidation.dateOfBirth}` : ""} htmlFor="date">date of birth: </label>
              <input type="date" value={formData.dateOfBirth} name="dateOfBirth" onChange={inputChangeHandler} />

            </div>

          </div>




          <label htmlFor="nation" className={formValidation.nation ? `input-validation-fault--${formValidation.nation}` : ""}  >nation: </label>
          <select id="nation" name="nation" value={formData.nation} onChange={inputChangeHandler}>
            <option defaultValue="" hidden >Choose here</option>
            {
              Object.keys(nations).map(key => {
                return <option key={key} value={key}>{nations[key]}</option>
              }
              )
            }

          </select>


        </form>
        <button className="entertoapp__formbox__singup__button" onClick={inputValidation} > sign up</button>
      </div>
    </div>
  );
}

export default Registration;