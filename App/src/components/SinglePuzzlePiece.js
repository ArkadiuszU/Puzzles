import React , {useState, useEffect} from 'react';

function SinglePuzzlePiece({pieceId, MovePuzzlePieceHandle, piecePos}) {

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
              onDoubleClick = {() =>  MovePuzzlePieceHandle(pieceId , false)}
              className = {
                            `playboard__singlepuzzlepiece
                              ${(isGrabbed)?"playboard__singlepuzzlepiece-grabbed":null}`
                          } 
              style = {{backgroundPosition: ` ${piecePos}px 0px`  }}>

                            ID= {pieceId}

        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  