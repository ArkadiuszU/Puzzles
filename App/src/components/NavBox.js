import React , { useState, useEffect, useCallback  } from 'react';
import {Link} from 'react-router-dom';

function NavBox({title, content, buttonText, navTo}) {

  const [hover, setHover] = useState(false)
    
    return (
                <div className = {`welcome__navbox__box ${hover?"welcome__navbox__box--hover":""}`} >
                    <div>
                    <h1>{title}</h1>
                   <p> {content} </p>
                    </div>
                  
                    <Link onMouseEnter={ () => setHover(true)} onMouseLeave={() => setHover(false)} className= "welcome__navbox__box__button" to={navTo}> {buttonText}</Link>
                </div>
    );
  }

export default NavBox;