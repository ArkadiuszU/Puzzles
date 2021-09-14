import React , { useState, useEffect, useCallback  } from 'react';
import {Link} from 'react-router-dom';

function ImagesList() {

  const [puzzleTasks, setPuzzleTasks] = useState([])

  useEffect(()=>{
    console.log("nohej");

    fetch('https://puzzlesapi.azurewebsites.net/api/PuzzleTask')
  .then(response => response.json())
  .then(data => { console.log(data); setPuzzleTasks(data)});

  }, [])

    return (
      <div className= "imageslist">
      <h2>select yours puzzle to play</h2>
       
       <div className= "imageslist__container">
       {
              puzzleTasks.map((el, id)=>
              {
                return (
                  <div key= {id} className= "imageslist__container__element" >
                 <Link  className= "mageslist__container__element__button" to= {`/playboard/${id+1}`}>{el.name}</Link>
                  <img src = {el.imagePath}/>
                  </div>
                )
              })

              

            }
       </div>
  
      </div>
    );
  }

export default ImagesList;