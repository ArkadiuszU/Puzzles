import React , {useState, useEffect} from 'react';

import test from "../resources/img/puzzle-task-image.png";

function SinglePuzzlePiece({pieceId, MovePuzzlePieceHandle, piecePos, size, onGrabfield}) {

  const[isGrabbed, setGrabbed] = useState(false);

  useEffect(()=> {

    if(!isGrabbed)
      MovePuzzlePieceHandle(pieceId , true)

  }, [isGrabbed])

    return (
    <>
        <div draggable = {true} 
              onDragStart = {()=> setGrabbed(true)}
              onDragEnd = {()=> setGrabbed(false)}
              onDoubleClick = {() => (!onGrabfield)?MovePuzzlePieceHandle(pieceId , false):null}
              className = {
                            `playboard__singlepuzzlepiece
                              ${(isGrabbed)?"playboard__singlepuzzlepiece-grabbed":null}
                              ${(!onGrabfield)?"playboard__singlepuzzlepiece-dropped":null}`
                          } 
              style = {{backgroundPosition: ` ${piecePos.x}px ${piecePos.y}px` , width : `${size}px`, height : `${size}px` , margin : `${onGrabfield?"1%":"0%"}`,  backgroundImage :  `url(${test})`}}>

                            ID= {pieceId}

        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  