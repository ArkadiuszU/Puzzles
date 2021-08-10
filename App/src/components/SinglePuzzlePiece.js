import React , {useState, useEffect} from 'react';

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
                              ${(isGrabbed)?"playboard__singlepuzzlepiece-grabbed":null}`
                          } 
              style = {{backgroundPosition: ` ${piecePos.x}px ${piecePos.y}px` , width : `${size}px`, height : `${size}px` , margin : `${onGrabfield?"1%":"0%"}`}}>

                            ID= {pieceId}

        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  