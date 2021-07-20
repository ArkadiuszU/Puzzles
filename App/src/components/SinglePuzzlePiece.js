import React , {useState, useEffect} from 'react';

function SinglePuzzlePiece({pieceId, change}) {

  const[drag, setDrag] = useState(false);

  useEffect(()=> {
    console.log(drag)

    if(!drag)
    change(pieceId)

  }, [drag])

    return (
    <>
        <div draggable = {true} 
              onDragStart = {()=> setDrag(true)}
              onDragEnd = {()=> setDrag(false)}
              className = {
                            `playboard__singlepuzzlepiece
                            playboard__singlepuzzlepiece--drag-${drag}`
                          } >

                            ID= {pieceId}
        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  