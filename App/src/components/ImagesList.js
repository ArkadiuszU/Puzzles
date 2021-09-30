import React, {useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import ImageListContext from './Context'

function ImagesList() {

  const [elementHovered, SetElementHovered] = useState(false)

  const {puzzleTasks, setPuzzleTasks} = useContext(ImageListContext);

  useEffect(() => {


    if(puzzleTasks.length === 0)
    {

    setTimeout( () => {

      fetch('https://puzzlesapi.azurewebsites.net/api/PuzzleTask')
        .then(response => response.json())
        .then(data => { console.log(data); setPuzzleTasks(data) });

    }, 2000)
  }

  }, [])

  return (
    <div className="imageslist">
      <h2>select yours puzzle to play</h2>

      <div className="imageslist__container">
        {

          (puzzleTasks.length == 0) ?
            <div className="imageslist__container__loading">
              <Loading />
            </div> :
            puzzleTasks.map((el, id) => {
              return (

                <Link key={id} to={`/playboard/${id + 1}`}>
                  <div  className="imageslist__container__element" onMouseLeave={_ => SetElementHovered(false)} onMouseOver={_ => SetElementHovered(id)}>
                    <p > {el.name}</p>
                    <img className={`imageslist__container__element__img${(elementHovered === id) ? "--hovered" : ""}`} src={el.imagePath} />
                  </div>
                </Link>
              )
            })



        }
      </div>

    </div >
  );
}

export default ImagesList;