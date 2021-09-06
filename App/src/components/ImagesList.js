import React , { useState, useEffect, useCallback  } from 'react';
import {Link} from 'react-router-dom';



import image1 from "../resources/img/puzzle-task-image-1.png"
import image2 from "../resources/img/puzzle-task-image-2.jpg"
import image3 from "../resources/img/puzzle-task-image-3.jpg"
import image4 from "../resources/img/puzzle-task-image-4.jpg"
import image5 from "../resources/img/puzzle-task-image-5.jpg"
import image6 from "../resources/img/puzzle-task-image-6.jpg"
import image7 from "../resources/img/puzzle-task-image-7.jpg"
import image8 from "../resources/img/puzzle-task-image-8.jpg"
import imageFollowing from "../resources/img/following.svg"

const images =  [image1, image2, image3, image4, image5, image6, image7, image8,
  image1, image2, image3, image4, image5, image6, image7, image8,image1, image2, image3, image4, image5, image6, image7, image8]


function ImagesList() {

    return (
      <div className= "imageslist">
      <h2>select yours puzzle to play</h2>
       
       <div className= "imageslist__container">
       {
              images.map((el, id)=>
              {
                return (
                  <div className= "imageslist__container__element" >
                 <Link  className= "mageslist__container__element__button" to= {`/playboard/${id+1}`}> playboard</Link>
                  <img src = {el}/>
                  </div>
                )
              })

              

            }
       </div>
  
      </div>
    );
  }

export default ImagesList;