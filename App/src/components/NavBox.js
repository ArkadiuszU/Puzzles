import React , { useState, useEffect, useCallback  } from 'react';
import {Link} from 'react-router-dom';

function NavBox() {

    return (
                <div className="welcome__navbox__box">
                    <div>
                    <h1>Play!</h1>
                   <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                  
                    <Link className="welcome__navbox__box__button" to="/playboard">First page</Link>
                </div>
    );
  }

export default NavBox;