import React , { useState, useEffect, useCallback  } from 'react';
import {Link} from 'react-router-dom';

function ImagesList() {

    return (
      <>
            <Link  className= "welcome__navbox__box__button" to="/playboard/1"> playboard</Link>
            <Link  className= "welcome__navbox__box__button" to="/playboard/2"> playboard</Link>
      </>
    );
  }

export default ImagesList;