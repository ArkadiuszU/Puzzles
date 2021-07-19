import React , { useState, useEffect, useCallback  } from 'react';

function SinglePuzzlePiece({pieceId, abovePlayboard, selected, selectedHandle}) {

    const [position, setPosition] = useState({top: Math.random() * 80, left: Math.random() * 80})
    const [grab , setGrab ] = useState(false)

    useEffect(() => {
        console.log("no a jakkk")
      }, []);

      const changePositionEvent = useCallback(e => 
          {
            console.log(abovePlayboard);
              setPosition({left: e.clientX -25, top: e.clientY -25})
          },[])

      useEffect(() => {
          if(grab)
          {
            document.addEventListener('mousemove', changePositionEvent);
            selectedHandle(pieceId)
          }
          else 
            document.removeEventListener('mousemove', changePositionEvent);
        }, [grab]);

    return (
    <>
        <div onMouseDown = {()=> setGrab(true)} onMouseUp= {()=> setGrab(false)} style={{top: position.top, left:position.left}} 
             className = {
                            `playboard__singlepuzzlepiece
                            playboard__singlepuzzlepiece--color-${pieceId}
                            playboard__singlepuzzlepiece--grab-${grab?"grabbed":"droped"}
                            playboard__singlepuzzlepiece--selected-${(selected == pieceId)?"true":"false"}`
                          } >
        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  